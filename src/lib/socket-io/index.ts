import { io } from "socket.io-client";
import { userSocketsHandler } from "./events/user-sockets";

const socket = io();

userSocketsHandler.io(socket)();

export { socket };
