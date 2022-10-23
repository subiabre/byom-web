import type { SocketioEvent } from ".";

export const userSigninEvent: SocketioEvent = {
    server(server) {
        return {
            listen(client) {
                client.on('user:signin', async (user) => {
                    const room = user.username;
                    await client.join(room);
            
                    const list = await server.in(room)
                        .fetchSockets()
                        .then(sockets => sockets.map(socket=> socket.id));
            
                    server.to(room).emit('user:sockets', list);
                });
            },
        }
    },

    client(client) {
        return {
            listen() {
                return;
            },
        }
    },
}
