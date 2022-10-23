import { io } from "socket.io-client";
import { userSocketsEvent } from "./events/user-sockets-event";

const socket = io();

userSocketsEvent.client(socket);

export { socket };
