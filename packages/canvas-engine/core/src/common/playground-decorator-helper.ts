/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

// import type { AbleRegistry } from './able';
import type { EntityDataRegistry, EntityRegistry } from '.';

declare namespace Reflect {
  export function getMetadata(key: string | symbol, target: any): any;
  export function defineMetadata(key: string | symbol, value: any, target: any): any;
}

// export const ABLES_DECO_KEY = Symbol('AblesDecorator');
export const ENTITIES_DECO_KEY = Symbol('EntitiesDecorator');
// export const PAYLOAD_DECO_KEY = Symbol('PayloadDecorator');
// export const HANDLE_DECO_KEY = Symbol('HandleDecorator');
export const ENTITIES_BY_DATA_DECO_KEY = Symbol('EntitiesByDataDecorator');

const PROPERTIES_INJECTED = Symbol('PropertiesInjected');

export interface RegistryValueGetter<T> {
  (target: any, method: string | symbol): T;
}

export interface RegistryInit {
  (target: any, method: string | symbol): void;
}

export function getRegistryMetadata(target: any, key: symbol): any[] {
  return Reflect.getMetadata(key, target.prototype) || [];
}

function getRegistryInjectedProperties(target: any): string[] {
  return Reflect.getMetadata(PROPERTIES_INJECTED, target) || [];
}

function definePropertiesMetadata(target: any, property: string): void {
  const properties = getRegistryInjectedProperties(target);
  properties.push(property);
  Reflect.defineMetadata(PROPERTIES_INJECTED, properties, target);
}

/**
 *  在 rspack 场景编译ts文件时候
 *  decorator 注入的 property 会被当成 this 的属性, 导致 Reflect.metadata 失效
 */
export function removeInjectedProperties(instance: any): void {
  if (typeof instance === 'object') {
    const propertiesInjected = getRegistryInjectedProperties(instance.constructor.prototype);
    propertiesInjected.forEach(propertyKey => {
      // eslint-disable-next-line no-prototype-builtins
      if (instance.hasOwnProperty(propertyKey) && instance[propertyKey] === undefined) {
        delete instance[propertyKey];
      }
    });
  }
}

export function createRegistryDecorator(
  key: symbol,
  data: any,
  getValue?: RegistryValueGetter<any>,
  init?: RegistryInit,
): any {
  return (target: any, property: string): any => {
    let registries = Reflect.getMetadata(key, target);
    if (!registries) {
      registries = [];
      Reflect.defineMetadata(key, registries, target);
    }
    if (!Array.isArray(data)) {
      data = [data];
    }
    data.forEach((registry: any) => {
      if (!registries.includes(registry)) {
        registries.push(registry);
      }
    });
    if (init) init(target, property);
    if (property && getValue) {
      definePropertiesMetadata(target, property);
      return {
        enumerable: false,
        configurable: false,
        get(): any {
          return getValue(this, property);
        },
      };
    }
  };
}

// export function getAbleMetadata(layer: any): AbleRegistry[] {
//   return getRegistryMetadata(layer, ABLES_DECO_KEY);
// }

export function getEntityMetadata(layer: any): EntityRegistry[] {
  return getRegistryMetadata(layer, ENTITIES_DECO_KEY);
}
export function getEntityDatasMetadata(
  layer: any,
): { entity: EntityRegistry; data: EntityDataRegistry }[] {
  return getRegistryMetadata(layer, ENTITIES_BY_DATA_DECO_KEY);
}

// export function getPayloadMetadata(able: AbleRegistry): string | symbol {
//   return getRegistryMetadata(able, PAYLOAD_DECO_KEY)[0];
// }

// export function getHandleParams(able: AbleRegistry): EntityDataRegistry[] {
//   return getRegistryMetadata(able, HANDLE_DECO_KEY);
// }
