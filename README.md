# ai-agent-learn

> 使用千问大模型进行AI学习

## [使用 API Key](https://bailian.console.aliyun.com/cn-beijing/?tab=api#/api)

### 方式一：在第三方工具中调用模型

如果在 Chatbox 等工具或平台中调用模型，您可能需要输入三个信息：

- 本文获取的 API Key
- API Key 所属地域的 Base URL：
  ■ 华北 2（北京）：https://dashscope.aliyuncs.com/compatible-mode/v1
- 模型名称，如 qwen-plus
  常用工具配置：Chatbox、Cline、Claude Code、Dify、OpenClaw（原 Clawdbot/Moltbot）、Postman、Qwen Code。

### 方式二：通过代码调用模型

通过代码首次调用千问 API，建议配置 API Key 到环境变量，以避免硬编码在代码中导致泄露风险。

## 运行

```bash
node ./src/1.hello-langchain.mjs
```

## 📦 Tool（工具）

Tool 是 LangChain 框架中用于扩展大模型能力的机制。大模型本身只能进行文本对话，但通过 Tool，AI 可以：

📁 读写文件
🖥️ 执行系统命令
📂 浏览目录
🔌 调用外部 API

## 🔌 MCP（Model Context Protocol）

MCP 是一种标准化协议，用于连接 AI 模型与外部服务。它允许你将工具实现与主程序分离，形成独立的服务。

### 🖥️ Server 端

独立的 Node.js 进程，提供用户查询等服务：

```js
// 伪代码示例
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer();

// 注册工具
server.tool(
  "query_user", // 工具名称
  "查询用户信息", // 描述
  { userId: z.string() }, // 参数定义
  async ({ userId }) => {
    // 查询数据库或调用 API
    return userInfo;
  },
);
```

### 📱 Client 端（index.mjs）

主程序连接到 MCP 服务器并使用其提供的工具：

```js
import { MultiServerMCPClient } from "@langchain/mcp-adapters";

// 1. 创建客户端并连接服务器
const mcpClient = new MultiServerMCPClient({
  mcpServers: {
    "user-mcp-server": {
      command: "node",
      args: ["./src/5.mcp/server.mjs"],
    },
  },
});

// 2. 获取所有工具
const tools = await mcpClient.getTools();

// 3. 像普通 Tool 一样使用
const result = await tools
  .find((t) => t.name === "query_user")
  .invoke({
    userId: "002",
  });
```

### MCP 的优势

- 🔗 解耦: 工具实现与主程序分离，独立部署
- ♻️ 复用: 一个 MCP 服务可被多个客户端使用
- 📐 标准化: 遵循统一协议，易于集成第三方服务
- 🚀 扩展: 新增工具无需修改主程序代码

### MCP vs 普通 Tool

| 对比项 | 普通 Tool | MCP Tool |
|--------|-----------|----------|
| 位置 | 同一进程中 | 独立进程 |
| 部署 | 随主程序一起 | 可单独部署 |
| 通信 | 函数调用 | 进程间通信 |
| 适用场景 | 简单工具、本地操作 | 复杂服务、远程 API |
