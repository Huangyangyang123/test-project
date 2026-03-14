// Load environment variables from .env (optional)
require('dotenv').config();

const mongoose = require('mongoose')

async function connectMongo() {
  // 优先使用环境变量，回退到本地默认端口 27017（默认 MongoDB 端口）
  const uri = process.env.MONGO_URL

  try {
  // 新版本 mongoose driver 已默认启用现代解析器，移除已弃用选项
  await mongoose.connect(uri)
    // 打印已连接（掩码密码以防泄露）
    console.log('MongoDB 已连接:', uri.replace(/:(.*)@/, ':***@'))
  } catch (err) {
    console.error('MongoDB 连接失败:', err.message)
    // 失败时退出进程，避免服务器在没有 DB 的情况下继续运行
    process.exit(1)
  }
}

module.exports = connectMongo;