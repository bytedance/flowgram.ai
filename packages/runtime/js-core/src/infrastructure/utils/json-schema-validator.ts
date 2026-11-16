/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IJsonSchema, WorkflowVariableType } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeType } from './runtime-type';

// Define validation result type
type ValidationResult = {
  result: boolean;
  errorMessage?: string;
};

// Define JSON Schema validator parameters type
type JSONSchemaValidatorParams = {
  schema: IJsonSchema;
  value: unknown;
};

const ROOT_PATH = 'root';

export const isRootPath = (path: string) => path === ROOT_PATH;

// Recursively validate value against JSON Schema
const validateValue = (value: unknown, schema: IJsonSchema, path: string): ValidationResult => {
  // Handle $ref references (temporarily skip as no reference resolution mechanism is provided)
  if (schema.$ref) {
    return { result: true }; // Temporarily skip reference validation
  }

  // Check enum values
  if (schema.enum && schema.enum.length > 0) {
    if (!schema.enum.includes(value as string | number)) {
      return {
        result: false,
        errorMessage: `Value at ${path} must be one of: ${schema.enum.join(
          ', '
        )}, but got: ${JSON.stringify(value)}`,
      };
    }
  }

  // Validate based on type
  switch (schema.type) {
    case 'boolean':
      return validateBoolean(value, path);

    case 'string':
      return validateString(value, path);

    case WorkflowVariableType.DateTime:
      return WorkflowRuntimeType.isMatchWorkflowType(value, WorkflowVariableType.DateTime)
        ? { result: true }
        : { result: false, errorMessage: `Expected date-time at ${path}` };

    case 'integer':
      return validateInteger(value, path);

    case 'number':
      return validateNumber(value, path);

    case 'object':
      return validateObject(value, schema, path);

    case 'array':
      return validateArray(value, schema, path);

    case 'map':
      return validateMap(value, schema, path);

    default:
      return {
        result: false,
        errorMessage: `Unknown type "${schema.type}" at ${path}`,
      };
  }
};

// Validate boolean value
const validateBoolean = (value: unknown, path: string): ValidationResult => {
  if (typeof value !== 'boolean') {
    return {
      result: false,
      errorMessage: `Expected boolean at ${path}, but got: ${typeof value}`,
    };
  }
  return { result: true };
};

// Validate string value
const validateString = (value: unknown, path: string): ValidationResult => {
  if (typeof value !== 'string') {
    return {
      result: false,
      errorMessage: `Expected string at ${path}, but got: ${typeof value}`,
    };
  }
  return { result: true };
};

// Validate integer value
const validateInteger = (value: unknown, path: string): ValidationResult => {
  if (!Number.isInteger(value)) {
    return {
      result: false,
      errorMessage: `Expected integer at ${path}, but got: ${JSON.stringify(value)}`,
    };
  }
  return { result: true };
};

// Validate number value
const validateNumber = (value: unknown, path: string): ValidationResult => {
  if (typeof value !== 'number' || isNaN(value)) {
    return {
      result: false,
      errorMessage: `Expected number at ${path}, but got: ${JSON.stringify(value)}`,
    };
  }
  return { result: true };
};

// Validate object value
const validateObject = (value: unknown, schema: IJsonSchema, path: string): ValidationResult => {
  if (value === null || value === undefined) {
    return {
      result: false,
      errorMessage: `Expected object at ${path}, but got: ${value}`,
    };
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    return {
      result: false,
      errorMessage: `Expected object at ${path}, but got: ${
        Array.isArray(value) ? 'array' : typeof value
      }`,
    };
  }

  const objectValue = value as Record<string, unknown>;

  // Check required properties
  if (schema.required && schema.required.length > 0) {
    for (const requiredProperty of schema.required) {
      if (!(requiredProperty in objectValue)) {
        return {
          result: false,
          errorMessage: `Missing required property "${requiredProperty}" at ${path}`,
        };
      }
    }
  }

  // Check is field required
  if (schema.properties) {
    for (const [propertyName] of Object.entries(schema.properties)) {
      const isRequired = schema.required?.includes(propertyName) ?? false;
      if (isRequired && !(propertyName in objectValue)) {
        return {
          result: false,
          errorMessage: `Missing required property "${propertyName}" at ${path}`,
        };
      }
    }
  }

  // Validate properties
  if (schema.properties) {
    for (const [propertyName, propertySchema] of Object.entries(schema.properties)) {
      if (propertyName in objectValue) {
        const propertyPath = isRootPath(path) ? propertyName : `${path}.${propertyName}`;
        const propertyResult = validateValue(
          objectValue[propertyName],
          propertySchema,
          propertyPath
        );
        if (!propertyResult.result) {
          return propertyResult;
        }
      }
    }
  }

  // Validate additional properties
  if (schema.additionalProperties) {
    const definedProperties = new Set(Object.keys(schema.properties || {}));
    for (const [propertyName, propertyValue] of Object.entries(objectValue)) {
      if (!definedProperties.has(propertyName)) {
        const propertyPath = isRootPath(path) ? propertyName : `${path}.${propertyName}`;
        const propertyResult = validateValue(
          propertyValue,
          schema.additionalProperties,
          propertyPath
        );
        if (!propertyResult.result) {
          return propertyResult;
        }
      }
    }
  }

  return { result: true };
};

// Validate array value
const validateArray = (value: unknown, schema: IJsonSchema, path: string): ValidationResult => {
  if (!Array.isArray(value)) {
    return {
      result: false,
      errorMessage: `Expected array at ${path}, but got: ${typeof value}`,
    };
  }

  // Validate array items
  if (schema.items) {
    for (const [index, item] of value.entries()) {
      const itemPath = `${path}[${index}]`;
      const itemResult = validateValue(item, schema.items, itemPath);
      if (!itemResult.result) {
        return itemResult;
      }
    }
  }

  return { result: true };
};

// Validate map value (similar to object, but all values must conform to the same schema)
const validateMap = (value: unknown, schema: IJsonSchema, path: string): ValidationResult => {
  if (value === null || value === undefined) {
    return {
      result: false,
      errorMessage: `Expected map at ${path}, but got: ${value}`,
    };
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    return {
      result: false,
      errorMessage: `Expected map at ${path}, but got: ${
        Array.isArray(value) ? 'array' : typeof value
      }`,
    };
  }

  const mapValue = value as Record<string, unknown>;

  // If additionalProperties exists, validate all values
  if (schema.additionalProperties) {
    for (const [key, mapItemValue] of Object.entries(mapValue)) {
      const keyPath = isRootPath(path) ? key : `${path}.${key}`;
      const keyResult = validateValue(mapItemValue, schema.additionalProperties, keyPath);
      if (!keyResult.result) {
        return keyResult;
      }
    }
  }

  return { result: true };
};

// Main JSON Schema validator function
export const JSONSchemaValidator = (params: JSONSchemaValidatorParams): ValidationResult => {
  const { schema, value } = params;

  try {
    const validationResult = validateValue(value, schema, ROOT_PATH);
    return validationResult;
  } catch (error) {
    return {
      result: false,
      errorMessage: `Validation error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
