import { createNetFrom } from "../net";
import { Server } from "socket.io";
import { loadEnv } from "vite";
import type { Plugin } from "vite";
import { UserSigninEvent } from "./events/user-signin-event";

export function socketio(): Plugin {
    return {
        name: 'socket-io-server',
        configureServer(server) {
            const net = createNetFrom({ ...process.env, ...loadEnv('mock', process.cwd()) });
            const io = new Server(server.httpServer || net.web.port);

            io.on('connection', async (socket) => {
                UserSigninEvent.io(io).listen(socket);
            });
        }
    }
}