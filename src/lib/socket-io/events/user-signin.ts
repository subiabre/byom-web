import type { ClientEventEmitter, ServerEventHandler } from "."
import { socket } from "..";

export const userSigninEmitter: ClientEventEmitter = {
    emit(...args) {
        socket.emit('user:signin', ...args)
    },
}

export const userSigninHandler: ServerEventHandler = {
    io(server) {
        return (client) => {
            client.on('user:signin', async (user) => {
                const room = user.username;
                await client.join(room);
        
                const list = await server.in(room)
                    .fetchSockets()
                    .then(sockets => sockets.map(socket=> socket.id));
        
                server.to(room).emit('user:sockets', list);
            });
        }
    },
}
