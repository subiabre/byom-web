import { io } from "socket.io-client";
import { socketRoomEvent } from "./events/socket-room-event";
import { userSocketsEvent } from "./events/user-sockets-event";

const socket = io();

socketRoomEvent.client(socket);
userSocketsEvent.client(socket);

export { socket };
