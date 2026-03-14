const WebSocket = require('ws');
const Message = require('./models/Message');

function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });
  wss.on("connection", async (ws) => {
    ws.on("message", async (data) => {
      const msg = JSON.parse(data);
      console.log('msg',msg)
      const { room, sender, content } = msg;

      // 1. 保存到 MongoDB
      await Message.create({ room, sender, content });

      // 2. 广播给房间内所有用户
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(msg));
        }
      });

      // 3. 如果 @AI，则 AI 回复
      if (content.includes("@AI")) {
        console.log('进来了吗？')
        let aiText = "";
        try {
          const proxyUrl = process.env.OPENAI_PROXY_URL;
          if (!proxyUrl) throw new Error('OPENAI_PROXY_URL is not configured');

          // POST to the proxy function which will call OpenAI
          const resp = await fetch(proxyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: content.replace('@AI', '') })
          });

          if (!resp.ok) {
            const body = await resp.text();
            throw new Error(`Proxy responded ${resp.status}: ${body}`);
          }

          const json = await resp.json();
          aiText = json.text || json.content || '';

          console.log('aiText', aiText)

          // 保存 AI 消息
          await Message.create({
            room,
            sender: "AI",
            content: aiText,
            isAI: true
          });

          // 推送 AI 回复
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  room,
                  sender: "AI",
                  content: aiText,
                  isAI: true
                })
              );
            }
          });
        } catch (err) {
          console.error('askAI proxy failed:', err && err.message ? err.message : err);
          const errorText = 'AI 服务暂时不可用，请稍后重试。';
          try {
            await Message.create({
              room,
              sender: "System",
              content: errorText,
              isAI: false
            });
          } catch (e) {
            console.warn('保存系统错误消息失败', e && e.message ? e.message : e);
          }

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  room,
                  sender: "System",
                  content: errorText,
                  isAI: false,
                  error: true
                })
              );
            }
          });
        }
      }
    });
    ws.send(JSON.stringify({ system: true, content: "连接成功" }));
  });
  return wss;
}

module.exports = createWebSocketServer;
