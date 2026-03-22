const express = require('express');
const path = require('path');

const app = express();

// 提供前端生产文件
app.use(express.static(path.join(__dirname, '../dist')));

// 启动
app.listen(3001, '0.0.0.0', () => {
  console.log("服务器已启动：http://localhost:3001");
});
