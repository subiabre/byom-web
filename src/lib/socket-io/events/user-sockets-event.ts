import { writable } from "svelte/store";
import type { ClientEvent } from ".";

export const UserSocketsStore = writable({
    list: []
});

export const UserSocketsEvent: ClientEvent = {
    listen(socket) {
        socket.on('user:sockets', (list) => {
            UserSocketsStore.update(data => {
                return { ...data, list };
            });
        });
    },
}
