# Node Templates

这些是创建新节点的模板文件，使用时需要替换其中的占位符。

## 占位符说明

在使用模板时，需要将以下占位符替换为实际值：

| 占位符 | 说明 | 示例 |
|-------|------|------|
| `{NODE_NAME}` | 节点名称（PascalCase） | `Database`, `Webhook`, `EmailSender` |
| `{NODE_TYPE}` | 节点类型枚举值（SCREAMING_SNAKE_CASE） | `DATABASE`, `WEBHOOK`, `EMAIL_SENDER` |
| `{node_name}` | 节点名称（kebab-case，用于 ID 前缀） | `database`, `webhook`, `email_sender` |
| `{node_type}` | 节点类型（小写，用于 type 字段） | `database`, `webhook`, `email_sender` |
| `{节点功能描述}` | 节点的功能描述（中文） | `发送邮件`, `查询数据库`, `调用 Webhook` |

## 使用方法

### 简单节点

```bash
# 1. 复制模板
cp .claude/skills/create-node/templates/simple-node/index.ts \
   apps/demo-free-layout/src/nodes/database/index.ts

# 2. 替换占位符
# {NODE_NAME} → Database
# {NODE_TYPE} → DATABASE
# {node_name} → database
# {node_type} → database
# {节点功能描述} → 查询数据库
```

### 复杂节点

```bash
# 1. 复制模板目录
cp -r .claude/skills/create-node/templates/complex-node \
      apps/demo-free-layout/src/nodes/webhook

# 2. 替换所有文件中的占位符
# {NODE_NAME} → Webhook
# {NODE_TYPE} → WEBHOOK
# {node_name} → webhook
# {node_type} → webhook
# {节点功能描述} → 调用 Webhook
```

## 快速替换脚本（可选）

如果需要批量替换，可以使用以下命令（macOS/Linux）：

```bash
# 设置变量
NODE_NAME="Database"
NODE_TYPE="DATABASE"
node_name="database"
node_type="database"
description="查询数据库"

# 批量替换
find apps/demo-free-layout/src/nodes/database -type f -name "*.ts*" -exec sed -i '' \
  -e "s/{NODE_NAME}/$NODE_NAME/g" \
  -e "s/{NODE_TYPE}/$NODE_TYPE/g" \
  -e "s/{node_name}/$node_name/g" \
  -e "s/{node_type}/$node_type/g" \
  -e "s/{节点功能描述}/$description/g" \
  {} +
```
