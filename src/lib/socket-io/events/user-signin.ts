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
                await client.join(user.username);
        
                const list = await server.in(user.username)
                    .fetchSockets()
                    .then(sockets => sockets.map(socket=> socket.id));
        
                client.emit('user:sockets', list);
            });
        }
    },
}
