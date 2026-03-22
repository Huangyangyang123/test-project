// Load environment variables from .env (optional)
// require('dotenv').config();

const express = require('express');
// const cors = require('cors');
const path = require('path');
// const createWebSocketServer = require('./ws');
// const connectMongo = require('./mongo');

const app = express();

// 提供前端生产文件
app.use(express.static(path.join(__dirname, '../dist')));

// app.use(cors());
// app.use(express.json());
// // connectMongo();
const server = http.createServer(app);
// createWebSocketServer(server);

// 获取聊天记录 API
// app.get("/history/:room", async (req, res) => {
//   const Message = require('./models/Message');
//   const logs = await Message.find({ room: req.params.room });
//   res.json(logs);
// });

// 启动
app.listen(3001, () => {
  console.log("服务器已启动：http://localhost:3001");
});
