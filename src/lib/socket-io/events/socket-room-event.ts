import { createApiClient } from "../../functions/api";
import { createNetFrom } from "../../functions/net";
import type { SocketioEvent } from ".";

export const socketRoomEvent: SocketioEvent = {
    server(client, server) {
        client.emit('socket:getroom');

        client.on('socket:setroom', async (room) => {
            await client.join(room);

            const list = await server.in(room)
                .fetchSockets()
                .then(sockets => sockets.map(socket => socket.id));

            server.to(room).emit('user:sockets', list);
        });
    },

    client(client) {
        client.on('socket:getroom', async () => {
            const net = createNetFrom(import.meta.env);
            const api = createApiClient(net.api.addr);
            const res = await api.get('/auth/user');
            
            if (res.status !== 204) return;

            const user = await api.fetch(res.headers.get('Location') ?? '').then(res => res.json());

            client.emit('socket:setroom', user.username);
        });
    }
}
