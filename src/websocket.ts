export const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

let msg = JSON.stringify({
  event: "subscribe",
  channel: "ticker",
  symbol: "tBTCUSD"
});

export const initSocket = () => {
  socket.addEventListener("open", () => socket.send(msg));
};

export const subscribe = () => {
  socket.send(
    JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: "tBTCUSD"
    })
  );
};

export const unsubscribe = (id: number) => {
  socket.send(
    JSON.stringify({
      event: "unsubscribe",
      chanId: id
    })
  );
};
