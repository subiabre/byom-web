import type { SocketioEvent } from ".";
import { userSockets } from "../../stores/user-sockets";

export const userSocketsEvent: SocketioEvent = {
    client(client) {
        client.on('user:sockets', (list) => {
            console.log(list);
            userSockets.update(() => list);
        });
    },

    server(server) {
        return;
    },
}
