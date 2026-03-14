import OpenAI from "openai";
// 支持两种环境变量名：OPENAI_API_KEY 或 OPENAI_KEY
const apiKey = process.env.OPENAI_KEY;
console.log('apiKey==',apiKey)
if (!apiKey) {
  throw new Error("Please set OPENAI_API_KEY or OPENAI_KEY environment variable with your OpenAI API key.");
}
const client = new OpenAI({ apiKey });
// 注意: 不同地域的base_url不通用（下方示例使用北京地域的base_url）
// - 华北2（北京）: https://dashscope.aliyuncs.com/compatible-mode/v1
// - 新加坡: https://dashscope-intl.aliyuncs.com/compatible-mode/v1
const openai = new OpenAI(
    {
      apiKey: apiKey,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    }
);

const main = async()=>{
  const compatible = await openai.compatibleMode.create({
    model: "qwen3.5-plus",
    messages:[
      {
        role:'system',
        content:'你是你可爱的助手，名字叫小团团～'
      },
      {
        role: "user", 
        content: "你是谁？"
      }
    ]
  })
}

async function askAI(text, options = {}) {
  try {
    const res = await main()
    console.log('choices==',res.choices[0].message.content)
    return res.choices?.[0]?.message?.content || "";
  } catch (err) {
    console.log('err==',err)
  }
}
module.exports = askAI;