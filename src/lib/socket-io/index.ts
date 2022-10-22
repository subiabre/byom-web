import { io, Socket } from "socket.io-client";
import { UserSocketsEvent } from "./events/user-sockets-event";

const socket = io();

UserSocketsEvent.listen(socket);

export { socket };
