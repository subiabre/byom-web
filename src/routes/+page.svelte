<script lang="ts">
    import { API } from "$lib/functions/api";
    import { onMount } from "svelte";

    let users = [{ username: "user" }];

    onMount(async () => {
        users = await API.fetch('/users');
    })
</script>

<ul>
    {#each users as user}
        <li>{user.username}</li>
    {/each}
</ul>
