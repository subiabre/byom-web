<script lang="ts">
    import { createApiClient } from "$lib/functions/api";
    import { onMount } from "svelte";
    import { io } from "$lib/functions/socketio";

    let api = createApiClient(import.meta.env);
    let users = [{ username: "user" }];

    onMount(async () => {
        io.emit('hello');

        users = await api.get('/users').then(res => res.json());
    })
</script>

<ul>
    {#each users as user}
        <li>{user.username}</li>
    {/each}
</ul>
