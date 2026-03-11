import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";

// .env 文件位于 monorepo 根目录下，所以需要向上两级路径
dotenv.config();

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME || "qwen-coder-turbo",
  apiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: process.env.OPENAI_API_BASE_URL,
  },
});

const response = await model.invoke("介绍下自己");
console.log(response.content);
