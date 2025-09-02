/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { get } from 'lodash-es';
import {
  ASTFactory,
  ASTKind,
  ASTMatch,
  ASTNode,
  ASTNodeJSON,
  BaseType,
} from '@flowgram.ai/variable-core';

import { IJsonSchema } from './types';

export namespace JsonSchemaUtils {
  /**
   * Converts a JSON schema to an Abstract Syntax Tree (AST) representation.
   * This function recursively processes the JSON schema and creates corresponding AST nodes.
   *
   * For more information on JSON Schema, refer to the official documentation:
   * https://json-schema.org/
   *
   * @param jsonSchema - The JSON schema to convert.
   * @returns An AST node representing the JSON schema, or undefined if the schema type is not recognized.
   */
  export function schemaToAST(jsonSchema: IJsonSchema): ASTNodeJSON | undefined {
    const { type, extra, required } = jsonSchema || {};
    const { weak = false } = extra || {};

    if (!type) {
      return undefined;
    }

    switch (type) {
      case 'object':
        if (weak) {
          return { kind: ASTKind.Object, weak: true };
        }
        return ASTFactory.createObject({
          properties: Object.entries(jsonSchema.properties || {})
            /**
             * Sorts the properties of a JSON schema based on the 'extra.index' field.
             * If the 'extra.index' field is not present, the property will be treated as having an index of 0.
             */
            .sort((a, b) => (get(a?.[1], 'extra.index') || 0) - (get(b?.[1], 'extra.index') || 0))
            .map(([key, _property]) => ({
              key,
              type: schemaToAST(_property),
              meta: {
                title: _property.title,
                description: _property.description,
                required: !!required?.includes(key),
                default: _property.default,
              },
            })),
        });
      case 'array':
        if (weak) {
          return { kind: ASTKind.Array, weak: true };
        }
        return ASTFactory.createArray({
          items: schemaToAST(jsonSchema.items!),
        });
      case 'map':
        if (weak) {
          return { kind: ASTKind.Map, weak: true };
        }
        return ASTFactory.createMap({
          valueType: schemaToAST(jsonSchema.additionalProperties!),
        });
      case 'string':
        return ASTFactory.createString({ format: jsonSchema.format });
      case 'number':
        return ASTFactory.createNumber();
      case 'boolean':
        return ASTFactory.createBoolean();
      case 'integer':
        return ASTFactory.createInteger();

      default:
        // If the type is not recognized, return CustomType
        return ASTFactory.createCustomType({ typeName: type });
    }
  }

  /**
   * Convert AST To JSON Schema
   * @param typeAST
   * @returns
   */
  export function astToSchema(
    typeAST?: ASTNode,
    options?: {
      drilldown?: boolean;
      drilldownObject?: boolean;
      drilldownMap?: boolean;
      drilldownArray?: boolean;
    }
  ): IJsonSchema | undefined {
    const {
      drilldown = true,
      drilldownMap = drilldown,
      drilldownObject = drilldown,
      drilldownArray = drilldown,
    } = options || {};

    if (!typeAST) {
      return undefined;
    }

    if (ASTMatch.isString(typeAST)) {
      return {
        type: 'string',
        format: typeAST.format,
      };
    }

    if (ASTMatch.isBoolean(typeAST)) {
      return {
        type: 'boolean',
      };
    }

    if (ASTMatch.isNumber(typeAST)) {
      return {
        type: 'number',
      };
    }

    if (ASTMatch.isInteger(typeAST)) {
      return {
        type: 'integer',
      };
    }

    if (ASTMatch.isObject(typeAST)) {
      return {
        type: 'object',
        required: typeAST.properties
          .filter((property) => property.meta?.required)
          .map((property) => property.key),
        properties: drilldownObject
          ? Object.fromEntries(
              typeAST.properties.map((property) => {
                const schema = astToSchema(property.type);

                if (property.meta?.title && schema) {
                  schema.title = property.meta.title;
                }
                if (property.meta?.description && schema) {
                  schema.description = property.meta.description;
                }
                if (property.meta?.default && schema) {
                  schema.default = property.meta.default;
                }

                return [property.key, schema!];
              })
            )
          : {},
      };
    }

    if (ASTMatch.isArray(typeAST)) {
      return {
        type: 'array',
        items: drilldownArray ? astToSchema(typeAST.items) : undefined,
      };
    }

    if (ASTMatch.isMap(typeAST)) {
      return {
        type: 'map',
        items: drilldownMap ? astToSchema(typeAST.valueType) : undefined,
      };
    }

    if (ASTMatch.isCustomType(typeAST)) {
      return {
        type: typeAST.typeName,
      };
    }

    return undefined;
  }

  /**
   * Check if the AST type is match the JSON Schema
   * @param typeAST
   * @param schema
   * @returns
   */
  export function isASTMatchSchema(
    typeAST: BaseType,
    schema: IJsonSchema | IJsonSchema[]
  ): boolean {
    if (Array.isArray(schema)) {
      return typeAST.isTypeEqual(
        ASTFactory.createUnion({
          types: schema.map((_schema) => schemaToAST(_schema)!).filter(Boolean),
        })
      );
    }

    return typeAST.isTypeEqual(schemaToAST(schema));
  }
}
