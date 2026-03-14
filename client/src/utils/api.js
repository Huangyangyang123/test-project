export function connectWS(onMessage) {
  const url = "ws://localhost:3001";
  let ws = null;
  let reconnectDelay = 1000;
  const maxDelay = 30000;
  let shouldReconnect = true;

  function create() {
    ws = new WebSocket(url);
    ws.onopen = () => {
      reconnectDelay = 1000;
      console.log('WebSocket connected')
    };
    ws.onmessage = (e) => {
      if (typeof onMessage === 'function') onMessage(e);
    };
    ws.onclose = () => {
      if (!shouldReconnect) return;
      console.warn('WebSocket closed, reconnecting in', reconnectDelay);
      setTimeout(() => {
        reconnectDelay = Math.min(maxDelay, Math.floor(reconnectDelay * 1.5));
        create();
      }, reconnectDelay);
    };
    ws.onerror = (err) => {
      console.error('WebSocket error', err);
      try { ws.close(); } catch (e) {}
    };
  }

  create();

  return {
    send(data) {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(data);
        return true;
      }
      console.warn('WebSocket not open — message not sent');
      return false;
    },
    close() {
      shouldReconnect = false;
      if (ws) try { ws.close(); } catch (e) {}
    },
    get raw() { return ws; }
  };
}