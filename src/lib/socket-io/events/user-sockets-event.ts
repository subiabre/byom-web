import { userSockets } from "../../stores/user-sockets";
import type { SocketioEvent } from ".";

export const userSocketsEvent: SocketioEvent = {
    client(client) {
        return {
            listen() {
                client.on('user:sockets', (list) => {
                    userSockets.update(() => list);
                });
            },
        }
    },

    server(server) {
        return {
            listen(client) {
                return;
            },
        }
    },
}
