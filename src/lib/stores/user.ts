import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { socket } from "$lib/socket-io";

const local = browser ? JSON.parse(localStorage.getItem('byom:user') || '{}') : false;

export const user = writable( local || {
    id: 0,
    username: ''
});

user.subscribe((value) => {
    if (browser) localStorage.setItem('byom:user', JSON.stringify(value));
    socket.emit('user:update', value);
    socket.emit('user:socket', value.username);
});
