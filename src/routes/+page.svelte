<script lang="ts">
    import { createApiClient } from "$lib/functions/api";
    import { createNetFrom } from "$lib/functions/net";
    import { onMount } from "svelte";

    let api = createApiClient(createNetFrom(import.meta.env).api.addr);
    let users = [{ username: "user" }];

    onMount(async () => {
        users = await api.get("/users").then((res) => res.json());
    });
</script>

<ul>
    {#each users as user}
        <li>{user.username}</li>
    {/each}
</ul>
