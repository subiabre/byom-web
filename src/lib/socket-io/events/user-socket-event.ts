import type { SocketioEvent } from ".";

export const userSocketEvent: SocketioEvent = {
    server(client, server) {
        client.on('user:socket', async (room) => {
            await client.join(room);
    
            const list = await server.in(room)
                .fetchSockets()
                .then(sockets => sockets.map(socket=> socket.id));
    
            server.to(room).emit('user:sockets', list);
        });
    },

    client(client) {
        return;
    }
}
