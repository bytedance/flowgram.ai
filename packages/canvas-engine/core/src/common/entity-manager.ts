/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable, interfaces, multiInject, optional, postConstruct } from 'inversify';
import { Disposable, DisposableCollection, Emitter } from '@flowgram.ai/utils';

import { PlaygroundSchedule } from './playground-schedule';
import {
  injectPlaygroundContext,
  PlaygroundContainerFactory,
  PlaygroundContext,
} from './playground-context';
import { EntityManagerContribution } from './entity-manager-contribution';
import { ConfigEntity } from './config-entity';
// import { AbleManager } from './able-manager';
import type {
  Entity,
  EntityData,
  EntityDataInjector,
  EntityDataRegistry,
  EntityJSON,
  EntityOpts,
  EntityRegistry,
} from '.';

/**
 * 让 entity 可以注入到类中
 *
 * @example
 * ```
 *    class SomeClass {
 *      @inject(PlaygroundConfigEntity) playgroundConfig: PlaygroundConfigEntity
 *    }
 * ```
 * @param bind
 * @param entityRegistry
 */
export function bindConfigEntity(bind: interfaces.Bind, entityRegistry: EntityRegistry): void {
  bind(entityRegistry)
    .toDynamicValue(
      (ctx) =>
        ctx.container.get<EntityManager>(EntityManager)!.createEntity(entityRegistry)! as never
    )
    .inSingletonScope();
}

/**
 * TODO registry 改成 decorator
 * Entity 管理器，全局唯一
 */
@injectable()
export class EntityManager implements Disposable {
  readonly toDispose = new DisposableCollection();

  protected onEntityChangeEmitter = new Emitter<string>();

  protected onEntityInstanceChangeEmitter = new Emitter<{ entityType: string; entityId: string }>();

  protected onEntityLifeCycleEmitter = new Emitter<{
    type: 'add' | 'update' | 'delete';
    entity: Entity;
  }>();

  protected onEntityDataChangeEmitter = new Emitter<{
    entityType: string;
    entityDataType: string;
  }>();

  /**
   *  Entity 的类缓存，便于在 fromJSON 时候查询对应的类
   */
  protected registryMap: Map<string, EntityRegistry> = new Map();

  /**
   * Entity 数据类缓存，便于 fromJSON 使用
   */
  protected dataRegistryMap: Map<string, EntityDataRegistry> = new Map();

  /**
   * Entity 数据类依赖注入器，可用于在EntityData构造器中注入第三方模块
   */
  protected dataInjectorMap: Map<string, EntityDataInjector> = new Map();

  /**
   * Entity 的所有实例缓存
   */
  protected entityInstanceMap: Map<string, Entity> = new Map(); // By entity id

  /**
   * entity 全局版本更新
   * @protected
   */
  protected entityVersionMap: Map<string, number> = new Map();

  /**
   * data 全局版本更新
   * @protected
   */
  protected entityDataVersionMap: Map<string, number> = new Map();

  /**
   * Entity 的实例按类型缓存，便于查询优化
   */
  protected entityInstanceMapByType: Map<string, Entity[]> = new Map(); // By entity type

  /**
   * 所有配置实体的缓存
   */
  protected configEntities: Map<string, ConfigEntity> = new Map();

  /**
   * 当对应的实体类型变化后触发
   */
  readonly onEntityChange = this.onEntityChangeEmitter.event;

  /**
   * Fine-grained: fires when a specific entity instance changes (includes entityId).
   */
  readonly onEntityInstanceChange = this.onEntityInstanceChangeEmitter.event;

  /**
   * entity data 数据变化
   */
  readonly onEntityDataChange = this.onEntityDataChangeEmitter.event;

  /**
   * Entity 生命周期变化
   */
  readonly onEntityLifeCycleChange = this.onEntityLifeCycleEmitter.event;

  @multiInject(EntityManagerContribution)
  @optional()
  contributions: EntityManagerContribution[];

  @injectPlaygroundContext() context: PlaygroundContext;

  @inject(PlaygroundContainerFactory) @optional() protected containerFactory:
    | PlaygroundContainerFactory
    | undefined;

  /**
   * 暂停触发实体类型变化
   */
  changeEntityLocked = false;

  constructor() {
    this.toDispose.pushAll([
      this.onEntityChangeEmitter,
      this.onEntityInstanceChangeEmitter,
      this.schedule,
    ]);
  }

  @postConstruct()
  init() {
    this.contributions.forEach((contrib) => contrib.registerEntityManager?.(this));
  }

  /**
   * 创建实体
   */
  createEntity<T extends Entity>(
    Registry: EntityRegistry,
    opts?: Omit<T['__opts_type__'], 'entityManager'>
  ): T {
    if (!Registry.type) {
      throw new Error(`[EntityManager] createEntity need a type: ${Registry}`);
    }
    // this.registerEntity(Registry);
    // ConfigEntity 默认为单例
    if (this.configEntities.has(Registry.type)) {
      return this.configEntities.get(Registry.type) as any;
    }
    const entityOpts: EntityOpts = {
      entityManager: this,
      savedInManager: true,
      ...opts,
    };
    const entity = new Registry(entityOpts) as T;
    if (entityOpts.savedInManager) {
      this.saveEntity(entity);
    }
    return entity;
  }

  isConfigEntity(type: string): boolean {
    return this.configEntities.has(type);
  }

  /**
   * 批量删除实体
   */
  removeEntities(Registry: EntityRegistry): void {
    for (const e of this.getEntities(Registry).values()) {
      e.dispose();
    }
  }

  removeEntityById(id: string): boolean {
    const entity = this.getEntityById(id);
    if (entity) {
      entity.dispose();
      return true;
    }
    return false;
  }

  /**
   * 触发实体 reset
   * @param registry
   */
  resetEntities(registry: EntityRegistry): void {
    const entities = this.getEntities(registry);
    entities.forEach((entity) => {
      entity.reset();
    });
  }

  resetEntity(registry: EntityRegistry, autoCreate?: boolean): void {
    const entity = this.getEntity(registry, autoCreate);
    entity?.reset();
  }

  updateConfigEntity<E extends ConfigEntity>(
    registry: EntityRegistry,
    config: Partial<E['config']>
  ): void {
    const entity = this.configEntities.get(registry.type);
    if (entity) {
      entity.updateConfig(config);
    }
  }

  /**
   * @param type
   */
  getRegistryByType(type: string): EntityRegistry | undefined {
    return this.registryMap.get(type);
  }

  registerEntity(Registry: EntityRegistry): void {
    if (!Registry.type) throw new Error(`Registry entity need a type: ${Registry.name}`);
    const oldRegistry = this.registryMap.get(Registry.type);
    if (oldRegistry) {
      if (oldRegistry !== Registry) {
        throw new Error(`Entity registry ${Registry.type} need a new type`);
      }
      return;
    }
    this.registryMap.set(Registry.type, Registry);
  }

  registerEntityData(Registry: EntityDataRegistry, injector?: EntityDataInjector): void {
    if (!Registry.type) throw new Error(`Registry entity data need a type: ${Registry.name}`);
    const oldRegistry = this.dataRegistryMap.get(Registry.type);
    if (!oldRegistry) {
      this.dataRegistryMap.set(Registry.type, Registry);
      // if (oldRegistry !== Registry) {
      //   throw new Error(`Entity data registry ${Registry.type} need a new type`)
      // }
      // return
    }

    const oldInjector = this.dataInjectorMap.get(Registry.type);
    if (!oldInjector && injector) {
      this.dataInjectorMap.set(Registry.type, injector);
    }
  }

  getDataRegistryByType(type: string): EntityDataRegistry | undefined {
    return this.dataRegistryMap.get(type);
  }

  getEntityById<T extends Entity>(id: string): T | undefined {
    return this.entityInstanceMap.get(id) as T;
  }

  /**
   * @param autoCreate 是否要自动创建，默认 false
   */
  getEntity<T extends Entity>(registry: EntityRegistry, autoCreate?: boolean): T | undefined {
    const entity = this.getEntities<T>(registry)[0];
    if (!entity && autoCreate) {
      return this.createEntity<T>(registry);
    }
    return entity;
  }

  getEntities<T extends Entity>(registry: EntityRegistry): T[] {
    // 获取当前 entities 的快照
    return (this.entityInstanceMapByType.get(registry.type) as T[]) || [];
  }

  // getEntitiesByAble<T extends Entity>(registry: AbleRegistry): T[] {
  //   return this.ableManager.getEntitiesByAble<T>(registry);
  // }
  //
  // getEntitiesByAbles<T extends Entity>(...registries: AbleRegistry[]): T[] {
  //   return this.ableManager.getEntitiesByAbles<T>(...registries);
  // }
  //
  // getEntityByAble<T extends Entity>(registry: AbleRegistry): T | undefined {
  //   return this.ableManager.getEntityByAble<T>(registry);
  // }

  getEntityDatas<T extends EntityData>(
    entityRegistry: EntityRegistry,
    dataRegistry: EntityDataRegistry<T>
  ): T[] {
    return this.getEntities<any>(entityRegistry)
      .map((e: Entity) => e.getData<T>(dataRegistry))
      .filter((d) => !!d) as T[];
  }

  hasEntity(registry: EntityRegistry): boolean {
    return !!this.getEntity(registry);
  }

  /**
   * 只存储 config 数据，忽略动态数据
   */
  storeState({ configOnly = true }: { configOnly?: boolean } = {}): EntityJSON[] {
    const data: EntityJSON[] = [];
    for (const e of this.entityInstanceMap.values()) {
      if ((!configOnly || e instanceof ConfigEntity) && e.toJSON) {
        if (e.toJSON) {
          const d = e.toJSON();
          if (d) {
            data.push(d);
          }
        }
      }
    }
    return data;
  }

  restoreState(data: EntityJSON[]): void {
    if (!data || !Array.isArray(data)) return;
    data.forEach((s: EntityJSON) => {
      if (!s || !s.type || !s.id) return;
      const register = this.getRegistryByType(s.type);
      // 如果没有注册，则忽略掉
      if (!register) {
        console.warn(`Playground entity registry lost: ${s.type}`);
        return;
      }
      const entity = this.createEntity(register, {
        id: s.id,
      });
      if (entity.fromJSON) {
        entity.fromJSON(s);
      }
    });
  }

  protected saveEntity(entity: Entity): void {
    const { id } = entity;
    // 无法重复创建
    if (id && this.entityInstanceMap.has(id)) {
      console.error(`Entity ${entity.type} ${id} is created before`);
      return;
    }

    this.entityInstanceMap.set(entity.id, entity);
    let entities = this.entityInstanceMapByType.get(entity.type);
    if (!entities) {
      entities = [];
      this.entityInstanceMapByType.set(entity.type, entities);
    }
    if (entity instanceof ConfigEntity) {
      this.configEntities.set(entity.type, entity);
    }
    entities.push(entity);
    entity.onEntityChange((entity) => {
      this.fireEntityChanged(entity);
      this.fireEntityLifeCycleChanged({ type: 'update', entity });
    });
    entity.onDataChange((e) => {
      this.fireEntityDataChanged(entity.type, e.data.type);
    });
    entity.toDispose.push(
      Disposable.create(() => {
        this.removeEntity(entity);
        this.fireEntityLifeCycleChanged({ type: 'delete', entity });
      })
    );
    entity
      .getDefaultDataRegistries()
      .forEach((registry) => this.fireEntityDataChanged(entity.type, registry.type));
    this.fireEntityChanged(entity);
    this.fireEntityLifeCycleChanged({ type: 'add', entity });
  }

  protected removeEntity(entity: Entity): void {
    if (this.entityInstanceMap.has(entity.id) && this.entityInstanceMapByType.has(entity.type)) {
      const entities = this.entityInstanceMapByType.get(entity.type)!;
      const index = entities.indexOf(entity);
      if (index !== -1) {
        this.entityInstanceMapByType.set(
          entity.type,
          entities.filter((e) => e !== entity)
        );
        this.entityInstanceMap.delete(entity.id);

        if (this.configEntities.has(entity.type)) {
          this.configEntities.delete(entity.type);
        }

        this.fireEntityChanged(entity);
      }
    }
  }

  /**
   * 重制所有 entity 为初始化状态
   */
  reset(): void {
    for (const entity of this.entityInstanceMap.values()) {
      entity.reset();
    }
  }

  private schedule = new PlaygroundSchedule();

  fireEntityChanged = (entity: Entity | string) => {
    const entityType = typeof entity === 'string' ? entity : entity.type;
    const entityId = typeof entity === 'string' ? undefined : entity.id;
    let version = this.entityVersionMap.get(entityType) || 0;
    /* istanbul ignore next */
    if (version === Number.MAX_SAFE_INTEGER) {
      version = 0;
    }
    this.entityVersionMap.set(entityType, version + 1);
    if (this.changeEntityLocked) return;
    this.schedule.push(entityType, () => {
      this.onEntityChangeEmitter.fire(entityType);
    });
    if (entityId) {
      this.schedule.push(`instance/${entityId}`, () => {
        this.onEntityInstanceChangeEmitter.fire({ entityType, entityId });
      });
    }
  };

  fireEntityDataChanged = (entityType: string, entityDataType: string) => {
    let version = this.entityDataVersionMap.get(entityDataType) || 0;
    /* istanbul ignore next */
    if (version === Number.MAX_SAFE_INTEGER) {
      version = 0;
    }
    this.entityDataVersionMap.set(entityDataType, version + 1);
    this.schedule.push(`${entityType}/${entityDataType}`, () => {
      this.onEntityDataChangeEmitter.fire({ entityType, entityDataType });
    });
  };

  fireEntityLifeCycleChanged = ({
    type,
    entity,
  }: {
    type: 'add' | 'update' | 'delete';
    entity: Entity;
  }) => {
    this.schedule.push(`${type}/${entity.id}`, () => {
      this.onEntityLifeCycleEmitter.fire({ type, entity });
    });
  };

  getEntityVersion(registry: EntityRegistry | string): number {
    return this.entityVersionMap.get(typeof registry === 'string' ? registry : registry.type) || 0;
  }

  getEntityDataVersion(registry: EntityDataRegistry | string): number {
    return (
      this.entityDataVersionMap.get(typeof registry === 'string' ? registry : registry.type) || 0
    );
  }

  dispose(): void {
    this.toDispose.dispose();
  }

  getDataInjector(registry: EntityDataRegistry | string) {
    return this.dataInjectorMap.get(typeof registry === 'string' ? registry : registry.type);
  }

  getService<T>(identifier: interfaces.ServiceIdentifier<T>): T {
    return this.containerFactory?.get<T>(identifier) as T;
  }
}
