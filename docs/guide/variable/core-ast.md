# 内置 AST(WIP)

## 声明

### BaseVariableField

`BaseVariableField` 是所有**变量声明**和**属性声明**的 AST 节点的**抽象基类**，它定义了变量字段通用的 `key`、`type`、`initializer` 和 `meta` 属性。

`BaseVariableField` 使用示例如下：

```tsx
// 通过 getByKeyPath 获取到变量字段
const varField = scope.available.getByKeyPath(["custom_node_0", "query"])

// 获取变量字段上的信息
console.log(varField.key); // query
console.log(varField.keyPath); // ["custom_node_0", "query"]
console.log(varField.meta); // { title: 'Query }
console.log(varField.type.kind); // String
console.log(varField.initializer.kind); // KeyPathExpression

// 获取 ASTNodeJSON
console.log(varField.toJSON()); // 输出变量声明的 JSON 结构

// 获取下钻字段
console.log(varField.getByKeyPath(['a', 'b', 'c']));

// 更新类型
varField.updateType(ASTFactory.createNumber());

// 更新 meta 元信息
varField.updateMeta({ title: 'Query 2' });

// 更新 initializer
varField.updateInitializer(ASTFactory.createKeyPathExpression({
  keyPath: ['start_0', 'query'],
}));

// 监听变量类型变化
const disposable = varField.onTypeChange((typeAST) => {
  console.log(typeAST.kind);
})
```

`VariableDeclaration` 和 `Property` 都继承自 `BaseVariableField`，两者的区别为：

* `VariableDeclaration` 用于表示变量的声明和初始化，没有父 Field
* `Property` 用于表示 Object 对象上的一个属性声明，有父 Field，父 Field 可以是其他 `Property` 或者 `VariableDeclaration`

### VariableDeclaration

`VariableDeclaration` 继承自 `BaseVariableField`，是作用域进行变量声明语句的 AST 节点，用于表示变量的声明和初始化。

通过内置的 `ASTFactory` 快速创建 `VariableDeclaration`：

````tsx
import { ASTFactory, ASTKind } from '@flowgram/editor';

/**
 * 通过 ASTFactory 创建一个变量声明，类型为 String 类型
 *
 * Equals To Plain JSON:
 * ```json
 * {
 *   "kind": "VariableDeclaration",
 *   "key": "my_unique_variable",
 *   "meta": { "title": "My Variable" },
 *   "order": 0,
 *   "type": { "kind": "String" }
 * }
 * ```
 *
 * Similar to js code:
 * ```js
 * const my_unique_variable: string;
 * ```
 */
scope.setVar(
  ASTFactory.createVariableDeclaration({
    key: 'my_unique_variable',
    meta: { title: 'My Variable' },
    type: ASTFactory.createString(),
    order: 0,
  })
)

/**
 * 通过 ASTFactory 创建一个变量声明，声明的右值为指向 start_0.query 的 keyPath 表达式
 *
 * Equals To Plain JSON:
 * ```json
 * {
 *   "kind": "VariableDeclaration",
 *   "key": "my_unique_variable_2",
 *   "meta": { "title": "My Variable 2" },
 *   "order": 1,
 *   "initializer": { "kind": "KeyPathExpression", "keyPath": ["start_0", "query"] }
 * }
 * ```
 *
 * Similar to js code:
 * ```js
 * const my_unique_variable_2 = start_0.query;
 * ```
 */
scope_2.setVar(
  ASTFactory.createVariableDeclaration({
    key: 'my_unique_variable_2',
    meta: { title: 'My Variable 2' },
    initializer: ASTFactory.createKeyPathExpression({
      keyPath: ['start_0', 'query'],
    }),
    order: 1,
  })
)
````

变量引擎将 `VariableDeclaration` 实例化后，可以获取变量声明上的信息，并进行更新、监听等操作：

```tsx
import { ASTMatch } from "@flowgram/editor";

const varDecl = scope.getVar<VariableDeclaration>();

// 判断 AST 节点是否为 VariableDeclaration
if(!ASTMatch.isVariableDeclaration(varDecl)) {
  throw new Error('AST 节点不是 VariableDeclaration 类型');
}

// 获取变量声明上的信息
console.log(varDecl.key); // my_unique_variable_2
console.log(varDecl.meta); // { title: 'My Variable 2' }
console.log(varDecl.type.kind); // String
console.log(varDecl.initializer); // KeyPathExpression

// 获取 ASTNodeJSON
console.log(varDecl.toJSON()); // 输出变量声明的 JSON 结构

// 获取下钻字段
console.log(varDecl.getByKeyPath(['a', 'b', 'c']));

// 更新类型
varDecl.updateType(ASTFactory.createNumber());

// 更新 initializer
varDecl.updateInitializer(ASTFactory.createKeyPathExpression({
  keyPath: ['start_0', 'query'],
}));

// 监听变量类型变化
const disposable = varDecl.onTypeChange((typeAST) => {
  console.log(typeAST.kind);
})
```

### Property

### VariableDeclarationList

## 类型

### BaseType

### StringType

### NumberType

### IntegerType

### ObjectType

### ArrayType

### MapType

## 表达式

### BaseExpression

### EnumerateExpression

### WrapArrayExpression
