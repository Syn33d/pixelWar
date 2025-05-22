import { io } from 'socket.io-client';

export const socket = io('http://172.233.255.18:3001', {
  transports: ['websocket'],
});
