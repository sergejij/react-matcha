import io from 'socket.io-client';

// const socket = io('https://81.177.141.123:637/test/ws');
const socket = new WebSocket('wss://81.177.141.123:637/test/ws');

export default socket;
