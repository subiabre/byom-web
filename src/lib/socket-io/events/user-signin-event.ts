import type { ServerEvent } from "."

export const UserSigninEvent: ServerEvent = {
    io(io) {
        return {
            listen(socket) {
                socket.on('user:signin', async (user) => {
                    await socket.join(user.username);

                    const list = await io.in(user.username)
                        .fetchSockets()
                        .then(sockets => sockets.map(socket => socket.id));

                    socket.emit('user:sockets', list);
                });
            },
        }
    },
}
