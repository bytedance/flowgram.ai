/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { vi } from 'vitest';
import { Container } from 'inversify';

import {
  // Able,
  // AbleManager,
  // type AbleRegistry,
  ConfigEntity,
  Entity,
  EntityData,
  type EntityDataRegistry,
  EntityManager,
  PlaygroundContainerFactory,
  PlaygroundContext,
} from '../src';

function createContainer(): Container {
  const child = new Container({ defaultScope: 'Singleton' });
  // child.bind(AbleManager).toSelf()
  child.bind(PlaygroundContext).toConstantValue({});
  child
    .bind(PlaygroundContainerFactory)
    .toDynamicValue((ctx) => ctx.container)
    .inSingletonScope();
  child.bind(EntityManager).toSelf();
  return child;
}

const container = createContainer();
const entityManager = container.get<EntityManager>(EntityManager);

function createEntity<T extends Entity>(t = TestEntity, opts: any = {}): T {
  return entityManager.createEntity<T>(t, opts);
}

interface TestSchema {
  v1: string;
  v2: number[];
}

class TestData extends EntityData<TestSchema> {
  static type = 'TestData';

  getDefaultData(): TestSchema {
    return { v1: 'test', v2: [1, 2] };
  }
}

interface Test1Schema {
  v: string;
}

class Test1Data extends EntityData<Test1Schema> {
  static type = Test1Data.name;

  getDefaultData(): Test1Schema {
    return { v: 'test1' };
  }
}

class SingleValueData extends EntityData<string> {
  static type = SingleValueData.name;

  getDefaultData(): string {
    return 'test';
  }
}

class TestEntity extends Entity {
  static type = TestEntity.name;
}

// class TestAble extends Able {
//   static type = TestAble.name
//
//   handle(...args: any[]): void {
//     throw new Error('Method not implemented.')
//   }
// }
//
// class Test1Able extends Able {
//   static type = Test1Able.name
//
//   handle(...args: any[]): void {
//     throw new Error('Method not implemented.')
//   }
// }

describe('EntityData', () => {
  test('data', () => {
    expect(new TestData(createEntity()).data).toEqual({ v1: 'test', v2: [1, 2] });
  });

  test('type', () => {
    expect(new TestData(createEntity()).type).toEqual('TestData');

    class _TestData extends EntityData<string> {
      static type = '';

      getDefaultData(): string {
        return 'test1';
      }
    }

    expect(() => new _TestData(createEntity()).type).toThrow('need a type');
  });

  test('update & fromJSON & toJSON', () => {
    const singleValueData = new SingleValueData(createEntity());
    singleValueData.update('new');
    expect(singleValueData.data).toEqual('new');

    const testData = new TestData(createEntity());
    testData.update({ v1: 'new' });
    expect(testData.data.v1).toEqual('new');
    testData.update('v2', [3, 4]);
    expect(testData.data.v2).toEqual([3, 4]);

    testData.fromJSON({ v1: 'new1', v2: [5] });
    expect(testData.toJSON()).toEqual({ v1: 'new1', v2: [5] });
  });

  test('onWillChange', () => {
    let oldData: any;
    let toDispose;
    const singleValueData = new SingleValueData(createEntity());
    toDispose = singleValueData.onWillChange((event) => {
      oldData = event.data;
    });
    singleValueData.update('new');
    expect(oldData).toEqual('test');
    singleValueData.update('new1');
    expect(oldData).toEqual('new');
    toDispose.dispose();

    const testData = new TestData(createEntity());
    toDispose = testData.onWillChange((event) => {
      oldData = JSON.parse(JSON.stringify(event.data));
    });
    testData.update({ v1: 'new' });
    expect(oldData.v1).toEqual('test');
    testData.update('v2', [3, 4]);
    expect(oldData.v1).toEqual('new');
    testData.update('v2', [4, 5]);
    expect(oldData.v2).toEqual([3, 4]);
  });

  test('changeLocked & version', () => {
    const testData = new TestData(createEntity());
    expect(testData.version).toEqual(0);
    testData.update({ v1: 'new' });
    expect(testData.version).toEqual(1);

    const testData1 = new TestData(createEntity());
    expect(testData1.version).toEqual(0);
    expect(testData1.changeLocked).toEqual(false);
    testData1.changeLocked = true;
    testData1.update({ v1: 'new' });
    expect(testData1.changeLocked).toEqual(true);
    expect(testData1.version).toEqual(0);
  });

  test.skip('bindChange', () => {
    const cb = vi.fn();
    const testData2 = new TestData(createEntity());
    testData2.dispose();
    expect(cb.mock.calls).toHaveLength(1);
  });
});

describe('Entity', () => {
  test('isRegistryOf', () => {
    class A {}

    class B extends A {}

    class C extends B {}

    expect(Entity.isRegistryOf(A, A)).toEqual(true);
    expect(Entity.isRegistryOf(B, B)).toEqual(true);
    expect(Entity.isRegistryOf(C, C)).toEqual(true);
    expect(Entity.isRegistryOf(B, A)).toEqual(true);
    expect(Entity.isRegistryOf(C, B)).toEqual(true);
    expect(Entity.isRegistryOf(C, A)).toEqual(true);
    expect(Entity.isRegistryOf(A, C)).toEqual(false);
  });

  test('version', () => {
    const entity = createEntity();
    const v = entity.version;
    expect(v).toBeGreaterThan(0);
    expect(createEntity().version).toEqual(v + 1);
  });

  test('type', () => {
    const entity = createEntity();
    expect(entity.type).toEqual(TestEntity.name);
    expect(Entity.getType(TestEntity)).toEqual(TestEntity.name);

    class _TestEntity extends Entity {
      static type = '';
    }

    expect(() => entityManager.createEntity(_TestEntity).type).toThrow('type');
  });

  test('data CRUD', () => {
    const entity = createEntity();
    expect(entity.hasData(TestData)).toEqual(false);
    entity.addData(TestData);
    expect(entity.hasData(TestData)).toEqual(true);
    expect(entity.getData(TestData)?.data).toEqual({ v1: 'test', v2: [1, 2] });
    entity.updateData(TestData, { v1: 'test1', v2: [3] });
    expect(entity.getData(TestData)?.data).toEqual({ v1: 'test1', v2: [3] });
    entity.removeData(TestData);
    expect(entity.hasData(TestData)).toEqual(false);

    // duplicated addData
    entity.addData(TestData);
    const entityData = entity.addData(TestData, { v1: 'test0', v2: [1, 2] });
    expect(entityData.data).toEqual({ v1: 'test0', v2: [1, 2] });
  });

  test('getDefaultAbleRegistries & getDefaultDataRegistries', () => {
    class _TestEntity extends Entity {
      static type = TestEntity.name;

      // getDefaultAbleRegistries(): AbleRegistry[] {
      //   return [TestAble]
      // }

      getDefaultDataRegistries(): EntityDataRegistry[] {
        return [TestData];
      }
    }

    const entity = createEntity(_TestEntity);
    expect(entity.hasData(TestData)).toEqual(true);
    // expect(entity.hasAble(TestAble)).toEqual(true)
  });

  test('data initialize', () => {
    const entity = createEntity(TestEntity, {
      datas: [{ registry: Test1Data, data: { v: 'new-test1' } }],
    });
    expect(entity.hasData(Test1Data)).toEqual(true);
    expect(entity.hasData(TestData)).toEqual(false);

    entity.addInitializeData([TestData]);
    entity.removeData(TestData);
    expect(entity.hasData(TestData)).toEqual(true);
  });

  test('fromJSON & toJSON - NORMAL json', () => {
    const entity = createEntity();
    entity.addData(TestData);

    const json = {
      dataList: [
        {
          data: { v1: 'test', v2: [1, 2] },
          type: TestData.name,
        },
      ],
      // ableList: [],
      id: 'test',
      type: TestEntity.name,
    };
    entity.fromJSON(json);
    const json1 = entity.toJSON();
    expect(json1).toEqual({ ...json, id: json1?.id });
  });

  test('fromJSON & toJSON - ABNORMAL json', () => {
    const entity = createEntity();
    entity.addData(TestData);

    const json = {
      dataList: [
        {
          data: { v1: 'new-test', v2: [1, 2] },
          type: TestData.name,
        },
      ],
      // ableList: [],
      type: TestEntity.name,
    };
    entity.fromJSON(json as any);
    const json1 = entity.toJSON();
    expect(json1).not.toEqual({ ...json, id: json1?.id });
  });

  test('savedInManager', () => {
    const entity = createEntity(TestEntity, { savedInManager: undefined });
    expect(entity.savedInManager).toEqual(true);
  });

  test('dispose', () => {
    const entity = createEntity();
    const cb = vi.fn();
    entity.onDispose(cb);
    entity.dispose();
    expect(entity.disposed).toEqual(true);
    expect(cb.mock.calls.length).toEqual(1);
  });

  // test('able CRUD', () => {
  //   const entity = createEntity(TestEntity, { ables: [Test1Able] })
  //   expect(entity.hasAble(Test1Able)).toEqual(true)
  //   expect(entity.hasAbles(TestAble)).toEqual(false)
  //   entity.addAbles(TestAble)
  //   expect(entity.hasAble(TestAble)).toEqual(true)
  //   expect(entity.hasAbles(TestAble, Test1Able)).toEqual(true)
  //   expect(entity.ables.has(TestAble)).toEqual(true)
  //   entity.removeAbles(TestAble)
  //   expect(entity.hasAble(TestAble)).toEqual(false)
  // })
});

interface TestConfigEntityData {
  v: number;
}

class TestConfigEntity extends ConfigEntity<TestConfigEntityData> {
  static type = TestConfigEntity.name;

  getDefaultConfig(): TestConfigEntityData {
    return { v: 0 };
  }

  toDataJSON(): TestConfigEntityData {
    return {
      v: this.config.v + 1,
    };
  }
}

describe('ConfigEntity', () => {
  test('basic ConfigEntity', () => {
    const configEntity = new ConfigEntity({ entityManager });
    const cb = vi.fn();
    configEntity.onConfigChanged(cb);
    configEntity.updateConfig({ a: 1 });
    expect(cb.mock.calls.length).toEqual(1);
    expect(configEntity.config).toEqual({ a: 1 });
    expect(configEntity.toJSON()?.dataList.map((d: any) => (d as any).data)).toEqual([{ a: 1 }]);
  });

  test('custom ConfigEntity', () => {
    const configEntity = new TestConfigEntity({ entityManager });
    configEntity.updateConfig({ v: 1 });
    expect(configEntity.config).toEqual({ v: 1 });
    expect(configEntity.toJSON()?.dataList.map((d: any) => (d as any).data)).toEqual([{ v: 1 }]);
  });
});

describe('EntityManager', () => {
  let container1!: Container;
  let entityManager1!: EntityManager;

  beforeEach(() => {
    container1 = createContainer();
    entityManager1 = container1.get<EntityManager>(EntityManager);
  });

  test('Entity CRUD', () => {
    const entity1 = entityManager1.createEntity(Entity);
    const entity2 = entityManager1.createEntity(Entity);
    expect(entity1 !== entity2).toBeTruthy();
    expect(entityManager1.getEntities(Entity)).toEqual([entity1, entity2]);
    expect(entityManager1.getEntityById(entity1.id)).toEqual(entity1);
    expect(entityManager1.removeEntityById(entity1.id)).toEqual(true);
    expect(entityManager1.removeEntityById(entity1.id)).toEqual(false);
    expect(entityManager1.getEntityById(entity1.id)).toEqual(undefined);
    expect(entityManager1.getEntities(Entity)).toEqual([entity2]);

    const entity3 = entityManager1.createEntity(Entity);
    expect(entityManager1.getEntities(Entity)).toEqual([entity2, entity3]);
    entityManager1.removeEntities(Entity);
    expect(entityManager1.getEntities(Entity)).toEqual([]);

    // getEntity with autoCreate
    expect(entityManager1.getEntityVersion(TestEntity)).toEqual(0);
    const entity4 = entityManager1.getEntity(TestEntity);
    expect(entity4).toBeUndefined();
    expect(entityManager1.hasEntity(TestEntity)).toBeFalsy();
    const entity5 = entityManager1.getEntity(TestEntity, true);
    expect(entityManager1.getEntityVersion(TestEntity.name)).toEqual(1);
    entityManager1.changeEntityLocked = true;
    entityManager1.fireEntityChanged(TestEntity.name);
    entityManager1.changeEntityLocked = false;
    expect(entityManager1.getEntityVersion(TestEntity.name)).toEqual(2);
    expect(entity5).not.toBeUndefined();
    expect(entityManager1.hasEntity(TestEntity)).toBeTruthy();

    // saveEntity edge case
    const entity6 = entityManager1.createEntity(Entity, { id: entity5!.id });
    expect(entity6 !== entityManager1.getEntityById(entity6.id)).toBeTruthy();
    expect(entity5 === entityManager1.getEntityById(entity6.id)).toBeTruthy();

    // dispose
    entityManager1.dispose();
    // FIXME? expect(entityManager1.hasEntity(TestEntity)).toBeFalsy()
  });

  test('EntityData CRUD', () => {
    const entity1 = entityManager1.createEntity(Entity);
    const entity2 = entityManager1.createEntity(Entity);
    entity1.addData(TestData, { v1: 'test1', v2: [3] });
    expect(entity1.getData(TestData)?.data).toEqual({ v1: 'test1', v2: [3] });
    expect(entity2.getData(TestData)?.data).toEqual(undefined);
    entityManager1.resetEntities(Entity);
    expect(entity1.getData(TestData)?.data).toEqual(undefined);
    expect(entity2.getData(TestData)?.data).toEqual(undefined);

    entity1.addData(TestData, { v1: 'test1', v2: [3] });
    entityManager1.resetEntity(Entity);
    expect(entity1.getData(TestData)?.data).toEqual(undefined);

    entity1.addData(TestData, { v1: 'test1', v2: [3] });
    entity2.addData(TestData, { v1: 'test2', v2: [3] });
    expect(entityManager1.getEntityDataVersion(SingleValueData)).toEqual(0);
    entity2.addData(SingleValueData, 'test2');
    expect(entity1.getData(TestData)?.data).toEqual({ v1: 'test1', v2: [3] });
    expect(entity2.getData(SingleValueData)?.data).toEqual('test2');
    expect(entityManager1.getEntityDatas(Entity, TestData).map((d) => d.data)).toEqual([
      { v1: 'test1', v2: [3] },
      { v1: 'test2', v2: [3] },
    ]);
    expect(entityManager1.getEntityDataVersion(SingleValueData)).toEqual(1);
    entityManager1.reset();
    expect(entityManager1.getEntityDataVersion(SingleValueData.name)).toEqual(2);
    entityManager1.fireEntityDataChanged(entity1.type, SingleValueData.name);
    expect(entityManager1.getEntityDataVersion(SingleValueData.name)).toEqual(3);
    expect(entity1.getData(TestData)?.data).toEqual(undefined);
    expect(entity2.getData(TestData)?.data).toEqual(undefined);
    expect(entity2.getData(SingleValueData)?.data).toEqual(undefined);
  });

  // test.skip('Able CRUD', () => {})

  test.skip('ConfigEntity CRUD', () => {
    const getTestConfigEntity = () => entityManager1.getEntity<TestConfigEntity>(TestConfigEntity);
    expect(entityManager1.isConfigEntity(ConfigEntity.type)).toEqual(false);
    expect(entityManager1.isConfigEntity(TestConfigEntity.type)).toEqual(false);
    const testConfigEntity = entityManager1.createEntity(TestConfigEntity);
    expect(entityManager1.isConfigEntity(testConfigEntity.type)).toEqual(true);
    const testConfigEntity1 = entityManager1.createEntity(TestConfigEntity);
    expect(testConfigEntity === testConfigEntity1).toBeTruthy();

    entityManager1.updateConfigEntity(TestConfigEntity, { v: 2 });
    expect(getTestConfigEntity()?.config).toEqual({ v: 2 });
    const state = entityManager1.storeState();
    // console.log(JSON.stringify(state, null, 2))
    //
    // [
    //   {
    //     "type": "TestConfigEntity",
    //     "id": "k24ThXyF7hbjRBOD7z-4w",
    //     "ableList": [],
    //     "dataList": [
    //       {
    //         "type": "_TestConfigEntityDataMixin",
    //         "data": {
    //           "v": 3
    //         }
    //       }
    //     ]
    //   }
    // ]
    const datas = (state[0].dataList as EntityData[]).map((d) => d.data);
    expect(datas).toEqual([{ v: 3 }]);

    entityManager1.registerEntity(TestConfigEntity);
    expect(entityManager1.getRegistryByType(state[0].type)).toEqual(TestConfigEntity);
    entityManager1.removeEntities(TestConfigEntity);
    expect(getTestConfigEntity()?.config).toEqual(undefined);
    entityManager1.restoreState(state);
    expect(getTestConfigEntity()?.id.length).toBeGreaterThan(1);
    expect(getTestConfigEntity()?.config).toEqual({ v: 3 });
    (state[0].dataList as EntityData[])[0].data.v = 4;

    // restoreState edge cases
    entityManager1.removeEntities(TestConfigEntity);
    entityManager1.restoreState(undefined as any);
    expect(getTestConfigEntity()?.config).toEqual(undefined);
    entityManager1.restoreState([{}] as any);
    expect(getTestConfigEntity()?.config).toEqual(undefined);
    state[0].type = `${TestConfigEntity.name}-1`;
    entityManager1.restoreState(state);
    state[0].type = TestConfigEntity.name;
    expect(getTestConfigEntity()?.config).toEqual(undefined);
  });

  test('Entity Registry CRUD', () => {
    expect(entityManager1.getRegistryByType(TestEntity.type)).toEqual(undefined);
    entityManager1.registerEntity(TestEntity);
    expect(entityManager1.getRegistryByType(TestEntity.type)).toEqual(TestEntity);
    entityManager1.registerEntity(TestEntity); // duplicated
    expect(entityManager1.getRegistryByType(TestEntity.type)).toEqual(TestEntity);

    class _TestEntity extends Entity {
      static type = '';
    }

    expect(() => entityManager1.registerEntity(_TestEntity)).toThrow('need a type');

    class _Test1Entity extends Entity {
      static type = TestEntity.name;
    }

    expect(() => entityManager1.registerEntity(_Test1Entity)).toThrow('need a new type');
  });

  test('EntityData Registry CRUD', () => {
    expect(entityManager1.getDataRegistryByType(TestData.type)).toEqual(undefined);
    entityManager1.registerEntityData(TestData);
    expect(entityManager1.getDataRegistryByType(TestData.type)).toEqual(TestData);
    entityManager1.registerEntityData(TestData); // duplicated
    expect(entityManager1.getDataRegistryByType(TestData.type)).toEqual(TestData);

    class _TestEntityData extends EntityData {
      getDefaultData() {
        throw new Error('Method not implemented.');
      }

      static type = '';
    }

    expect(() => entityManager1.registerEntityData(_TestEntityData)).toThrow('need a type');

    // class _Test1EntityData extends EntityData {
    //   getDefaultData() {
    //     throw new Error('Method not implemented.')
    //   }

    //   static type = TestData.name
    // }
    // expect(() => entityManager1.registerEntityData(_Test1EntityData)).toThrow('need a new type')
  });
  test('Entity getService', () => {
    const entity1 = entityManager1.createEntity(Entity);
    expect(entity1.getService(EntityManager)).toEqual(entityManager1);
  });
});
