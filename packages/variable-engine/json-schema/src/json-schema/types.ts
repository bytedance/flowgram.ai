/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { BaseTypeRegistry, TypeRegistryCreator } from '../base';
import { type JsonSchemaTypeManager } from './json-schema-type-manager';

export type JsonSchemaBasicType =
  | 'boolean'
  | 'string'
  | 'integer'
  | 'number'
  | 'object'
  | 'array'
  | 'map';

export interface IJsonSchema<T = string> {
  type?: T;
  /**
   * The format of string
   * https://json-schema.org/understanding-json-schema/reference/type#format
   */
  format?: string;
  default?: any;
  title?: string;
  description?: string;
  enum?: (string | number)[];
  properties?: Record<string, IJsonSchema<T>>;
  additionalProperties?: IJsonSchema<T>;
  items?: IJsonSchema<T>;
  required?: string[];
  $ref?: string;
  extra?: {
    index?: number;
    // Used in BaseType.isEqualWithJSONSchema, the type comparison will be weak
    weak?: boolean;
    // Set the render component
    formComponent?: string;
    [key: string]: any;
  };
}

export type IBasicJsonSchema = IJsonSchema<JsonSchemaBasicType>;

/**
 * TypeRegistry based on IJsonSchema
 */
export interface JsonSchemaTypeRegistry<Schema extends Partial<IJsonSchema> = IJsonSchema>
  extends BaseTypeRegistry {
  /**
   * The icon of this type
   */
  icon: React.JSX.Element;
  /**
   * The display text of this type, not including the icon
   */
  label: string;
  /**
   * Whether it is a container type
   */
  container: boolean;
  /**
   * Supported parent types. Some types can only appear as subtypes in type selection, but not as basic types.
   */
  parentType?: string[];

  /*
   * Get supported sub-types
   */
  getSupportedItemTypes?: (ctx: {
    level: number;
    parentTypes?: string[];
  }) => Array<{ type: string; disabled?: string }>;

  /**
   * Get the display label
   */
  getDisplayLabel: (typeSchema: Schema) => React.JSX.Element;

  /**
   * Get the display text
   */
  getDisplayText: (typeSchema: Schema) => string | undefined;

  /**
   * Get the sub-type
   */
  getItemType?: (typeSchema: Schema) => Schema | undefined;

  /**
   * Generate default Schema
   */
  getDefaultSchema: () => Schema;

  /**
   * onInit initialization logic, which is called at the appropriate time externally to register data into the type system
   */
  onInit?: () => void;

  /**
   * Whether to allow adding fields, such as object
   */
  canAddField: (typeSchema: Schema) => boolean;

  /**
   * Get the string value, for example
   *  { type: "array", items: { type: "string" } }
   *  The value is "array-string"
   *
   * The use case is that in some UI components, a string value needs to be generated
   */
  getStringValueByTypeSchema?: (optionValue: Schema) => string | undefined;

  /**
   * Restore the string value to typeSchema
   * "array-string" is restored to
   *  { type: "array", items: { type: "string" } }
   */
  getTypeSchemaByStringValue?: (type: string) => Schema;

  /**
   * Get the display icon, and the composite icon of the array is also processed
   */
  getDisplayIcon: (typeSchema: Schema) => JSX.Element;

  /**
   * Get sub-properties
   */
  getTypeSchemaProperties: (typeSchema: Schema) => Record<string, Schema> | undefined;

  /**
   * Get the default value
   */
  getDefaultValue: () => unknown;

  /**
   * Get the display text based on the value
   */
  getValueText: (value?: unknown) => string;
  /**
   * Get the json path of a certain type in the flow schema
   * For example
   * { type: "object", properties: { name: { type: "string" } } }
   * -> ['properties', 'name']
   * { type: "array", items: { type: "string" } }
   * ->['items']
   */
  getJsonPaths: (typeSchema: Schema) => string[];

  /**
   * Get the parent node of the sub-field
   * object is itself
   * array<object> is items
   * map<object> is additionalProperties
   */
  getPropertiesParent: (typeSchema: Schema) => Schema | undefined;
  /**
   * The complexText of a custom type
   * For example, Array<string>, can be modified
   */
  customComplexText?: (typeSchema: Schema) => string;
}

export type JsonSchemaTypeRegistryCreator<
  Schema extends Partial<IJsonSchema> = IJsonSchema,
  Registry extends JsonSchemaTypeRegistry<Schema> = JsonSchemaTypeRegistry<Schema>,
  Manager extends JsonSchemaTypeManager<Schema, Registry> = JsonSchemaTypeManager<Schema, Registry>
> = TypeRegistryCreator<Schema, Registry, Manager>;
