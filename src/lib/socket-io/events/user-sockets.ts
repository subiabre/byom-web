import { writable } from "svelte/store";
import type { ClientEventHandler } from ".";

export const userSockets = writable({
    list: []
});

export const userSocketsHandler: ClientEventHandler = {
    io(client) {
        return () => {
            client.on('user:sockets', (list) => {
                userSockets.update(data => {
                    return { ...data, list };
                });
            });
        }
    },
}
