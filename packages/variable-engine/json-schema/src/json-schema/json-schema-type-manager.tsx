/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import React from 'react';

import { injectable } from 'inversify';

import { IJsonSchema, JsonSchemaTypeRegistry, JsonSchemaTypeRegistryCreator } from './types';
import { defaultTypeDefinitionRegistry } from './type-definition/default';
import { dateTimeRegistryCreator } from './type-definition/date-time';
import { BaseTypeManager } from '../base';
import {
  arrayRegistryCreator,
  booleanRegistryCreator,
  integerRegistryCreator,
  mapRegistryCreator,
  numberRegistryCreator,
  objectRegistryCreator,
  stringRegistryCreator,
  unknownRegistryCreator,
} from './type-definition';

@injectable()
export class JsonSchemaTypeManager<
  Schema extends Partial<IJsonSchema> = IJsonSchema,
  Registry extends JsonSchemaTypeRegistry<Schema> = JsonSchemaTypeRegistry<Schema>
> extends BaseTypeManager<Schema, Registry, JsonSchemaTypeManager<Schema, Registry>> {
  /**
   * get type name
   * @param typeSchema
   * @returns
   */
  protected getTypeNameFromSchema(typeSchema: Schema): string {
    if (!typeSchema) {
      return 'unknown';
    }
    if (typeSchema.enum) {
      return 'enum';
    }
    if (typeSchema.format && typeSchema.type === 'string') {
      return typeSchema.format;
    }

    return typeSchema.type || typeSchema.$ref || 'unknown';
  }

  constructor() {
    super();

    const registries = [
      defaultTypeDefinitionRegistry,
      stringRegistryCreator,
      integerRegistryCreator,
      numberRegistryCreator,
      booleanRegistryCreator,
      objectRegistryCreator,
      arrayRegistryCreator,
      unknownRegistryCreator,
      mapRegistryCreator,
      dateTimeRegistryCreator,
    ];

    registries.forEach((registry) => {
      this.register(
        registry as unknown as JsonSchemaTypeRegistryCreator<
          Schema,
          Registry,
          JsonSchemaTypeManager<Schema, Registry>
        >
      );
    });
  }

  /**
   * Get TypeRegistries based on the current parentType
   */
  public getTypeRegistriesWithParentType = (parentType = ''): Registry[] =>
    this.getAllTypeRegistries()
      .filter((v) => v.type !== 'default')
      .filter((v) => !v.parentType || v.parentType.includes(parentType));

  /**
   * Get the deepest child field of a field
   * Array<Array<String>> -> String
   */
  getTypeSchemaDeepChildField = (type: Schema) => {
    let registry = this.getTypeBySchema(type);

    let childType = type;

    while (registry?.getItemType && registry.getItemType(childType)) {
      childType = registry.getItemType(childType)!;
      registry = this.getTypeBySchema(childType);
    }

    return childType;
  };

  /**
   * Get the plain text display string of the type schema, for example:
   * Array<Array<String>>, Map<String, Number>
   */
  public getComplexText = (type: Schema): string => {
    const registry = this.getTypeBySchema(type);

    if (registry?.customComplexText) {
      return registry.customComplexText(type);
    }

    if (registry?.container && type.items) {
      return `${registry.label}<${this.getComplexText(type.items as Schema)}>`;
    } else if (registry?.container && type.additionalProperties) {
      return `${registry.label}<String, ${this.getComplexText(
        type.additionalProperties as Schema
      )}>`;
    } else {
      return registry?.label || type.type || 'unknown';
    }
  };

  public getDisplayIcon = (type: Schema) => {
    const registry = this.getTypeBySchema(type);
    return registry?.getDisplayIcon?.(type) || registry?.icon || <></>;
  };

  public getTypeSchemaProperties = (type: Schema) => {
    const registry = this.getTypeBySchema(type);
    return registry?.getTypeSchemaProperties(type);
  };

  public getPropertiesParent = (type: Schema) => {
    const registry = this.getTypeBySchema(type);
    return registry?.getPropertiesParent(type);
  };

  public getJsonPaths = (type: Schema) => {
    const registry = this.getTypeBySchema(type);
    return registry?.getJsonPaths(type);
  };

  public canAddField = (type: Schema) => {
    const registry = this.getTypeBySchema(type);
    return registry?.canAddField(type);
  };

  public getDefaultValue = (type: Schema) => {
    const registry = this.getTypeBySchema(type);
    return registry?.getDefaultValue();
  };
}
