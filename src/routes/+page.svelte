<script lang="ts">
    import { createApiClient } from "$lib/functions/api";
    import { onMount } from "svelte";

    let api = createApiClient(import.meta.env);
    let users = [{ username: "user" }];

    onMount(async () => {
        users = await api.fetch('/users').then(res => res.json());
    })
</script>

<ul>
    {#each users as user}
        <li>{user.username}</li>
    {/each}
</ul>
