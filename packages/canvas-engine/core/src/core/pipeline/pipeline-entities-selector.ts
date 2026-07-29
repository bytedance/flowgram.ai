/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';

import { type Layer } from '../layer';
import {
  // AbleManager,
  // type AbleRegistry,
  type Entity,
  type EntityData,
  type EntityDataRegistry,
  EntityManager,
  type EntityRegistry,
} from '../../common';

type SelectorVersion = Map<string, number>;

export interface LayerEntitiesSelector {
  // lastAbleVersion?: SelectorVersion;
  lastEntityVersion?: SelectorVersion;
  lastDataVersion?: SelectorVersion;
  lastEntities?: Entity[];
  lastDatas?: EntityData[];
  entities: EntityRegistry[];
  // ables: AbleRegistry[];
  datas: [EntityRegistry, EntityDataRegistry][]; // entity-data
}

/**
 * 选择器用来在 pipeline 绘制之前，筛选并注入 entities
 */
@injectable()
export class PipelineEntitiesSelector {
  protected layerEntitiesSelectorMap: WeakMap<Layer, LayerEntitiesSelector> = new WeakMap();

  readonly entityLayerMap: Map<string, Set<Layer>> = new Map();

  readonly ableLayerMap: Map<string, Set<Layer>> = new Map();

  // @inject(AbleManager) ableManager: AbleManager;

  @inject(EntityManager) entityManager: EntityManager;

  /**
   * 订阅关联的 entity，会影响 autorun
   */
  subscribeEntities(layer: Layer, entities: EntityRegistry[]): void {
    const selector = this.getSelector(layer);
    entities.forEach((e) => {
      if (!selector.entities.includes(e)) {
        selector.entities.push(e);
        clearSelectorCache(selector);
      }
      let layers = this.entityLayerMap.get(e.type);
      if (!layers) {
        layers = new Set();
        this.entityLayerMap.set(e.type, layers);
      }
      layers.add(layer);
    });
  }

  // /**
  //  * 订阅关联的 able, 会影响 autorun
  //  */
  // subscribeAbles(layer: Layer, ables: AbleRegistry[]): void {
  //   const selector = this.getSelector(layer);
  //   ables.forEach(able => {
  //     if (!selector.ables.includes(able)) selector.ables.push(able);
  //     let layers = this.ableLayerMap.get(able.type);
  //     if (!layers) {
  //       layers = new Set();
  //       this.ableLayerMap.set(able.type, layers);
  //     }
  //     layers.add(layer);
  //   });
  // }

  /**
   * 订阅 data 数据
   * @param layer
   * @param entity
   * @param data
   */
  subscribleEntityByData(layer: Layer, entity: EntityRegistry, data: EntityDataRegistry): void {
    const selector = this.getSelector(layer);
    // Entity 和 layer 做关联
    let layers = this.entityLayerMap.get(entity.type);
    if (!layers) {
      layers = new Set();
      this.entityLayerMap.set(entity.type, layers);
    }
    layers.add(layer);
    const item: [EntityRegistry, EntityDataRegistry] = [entity, data];
    if (!selector.datas.find((i) => i[0] === entity && i[1] === data)) {
      selector.datas.push(item);
      clearSelectorCache(selector);
    }
  }

  protected getSelector(layer: Layer): LayerEntitiesSelector {
    let selector = this.layerEntitiesSelectorMap.get(layer);
    if (!selector) {
      selector = { entities: [], datas: [] };
      this.layerEntitiesSelectorMap.set(layer, selector);
    }
    return selector;
  }

  /**
   * 查询 layer 关联的实体
   */
  getLayerEntities(layer: Layer): { entities: Entity[]; changed: boolean } {
    const selector = this.layerEntitiesSelectorMap.get(layer);
    /* v8 ignore next 1 */
    if (!selector) return { entities: [], changed: false };
    const allEntities: Set<Entity> = new Set();
    const entityVersion: SelectorVersion = new Map();
    selector.entities.forEach((registry) => {
      const version = this.entityManager.getEntityVersion(registry);
      entityVersion.set(registry.type, version);
    });
    const entityChanged = checkChanged(entityVersion, selector.lastEntityVersion);
    if (!entityChanged && selector.lastEntities) {
      return {
        entities: selector.lastEntities,
        changed: false,
      };
    }
    selector.entities.forEach((registry) => {
      const entities = this.entityManager.getEntities(registry);
      for (const item of entities) {
        allEntities.add(item);
      }
    });
    // selector.ables.forEach(registry => {
    //   const entities = this.ableManager.getEntitiesByAble(registry);
    //   for (const item of entities) {
    //     if (!entityVersion.has(item.type)) {
    //       const version = this.entityManager.getEntityVersion(item.type);
    //       entityVersion.set(item.type, version);
    //     }
    //     allEntities.add(item);
    //   }
    // });
    // To array
    const result: Entity[] = [];
    for (const item of allEntities.values()) {
      result.push(item);
    }
    /**
     * 检查版本变化
     */
    selector.lastEntityVersion = entityVersion;
    selector.lastEntities = result;
    return {
      entities: result,
      changed: entityChanged,
    };
  }

  getLayerEntityDatas(layer: Layer): { datas: EntityData[]; changed: boolean } {
    const selector = this.layerEntitiesSelectorMap.get(layer);
    /* v8 ignore next 1 */
    if (!selector) return { datas: [], changed: false };
    const allDatas: EntityData[] = [];
    const dataVersion: SelectorVersion = new Map();
    selector.datas.forEach((registries) => {
      const [, entityDataRegistry] = registries;
      const version = this.entityManager.getEntityDataVersion(entityDataRegistry);
      dataVersion.set(entityDataRegistry.type, version);
    });
    const dataChanged = checkChanged(dataVersion, selector.lastDataVersion);
    if (!dataChanged && selector.lastDatas) {
      return {
        datas: selector.lastDatas,
        changed: false,
      };
    }
    selector.datas.forEach((registries) => {
      const [entityRegistry, entityDataRegistry] = registries;
      const entityDatas = this.entityManager.getEntityDatas(entityRegistry, entityDataRegistry);
      /* v8 ignore next 3 */
      for (const item of entityDatas) {
        allDatas.push(item);
      }
    });
    selector.lastDataVersion = dataVersion;
    selector.lastDatas = allDatas;
    return {
      datas: allDatas,
      changed: dataChanged,
    };
  }

  getLayerData(layer: Layer): {
    observeEntities: Entity[];
    observeDatas: EntityData[];
    changed: boolean;
  } {
    const entitiesSelector = this.getLayerEntities(layer);
    const datasSelector = this.getLayerEntityDatas(layer);
    return {
      observeEntities: entitiesSelector.entities,
      observeDatas: datasSelector.datas,
      changed: datasSelector.changed || entitiesSelector.changed,
    };
  }
}

function clearSelectorCache(selector: LayerEntitiesSelector): void {
  selector.lastEntityVersion = undefined;
  selector.lastDataVersion = undefined;
  selector.lastEntities = undefined;
  selector.lastDatas = undefined;
}

function checkChanged(v1: SelectorVersion = new Map(), v2: SelectorVersion = new Map()): boolean {
  if (v1.size !== v2.size) return true;
  for (const key of v1.keys()) {
    /* v8 ignore next 1 */
    if (v1.get(key) !== v2.get(key)) return true;
  }
  return false;
}
