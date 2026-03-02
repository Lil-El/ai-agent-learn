# ai-tool-test

> 使用千问大模型进行学习

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
node ./src/hello-langchain.mjs
```
