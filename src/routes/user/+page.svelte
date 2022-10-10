<script lang="ts">
    import { goto } from "$app/navigation";
    import { createApiClient } from "$lib/functions/api";
    import { onMount } from "svelte";

    let api = createApiClient(import.meta.env);
    let user = { username: "" };
    let userSessions: any[] = [{ userAgent: "" }];

    onMount(async () => {
        const response = await api.get('/auth/user');
        
        switch (response.status) {
            case 204:
                user = JSON.parse(localStorage.getItem('byom:user') ?? '{}');
                userSessions = await api.get('/user_sessions').then(res => res.json());
                break;
        
            default:
                goto('/user/signin');
                break;
        }
    });
</script>

<svelte:head>
    <title>User.</title>
</svelte:head>

<div class="container mb-6">
    <h1 class="title">Hello, { user.username }.</h1>
    <p class="subtitle">How you've been?.</p>
</div>

<div class="container">
    <ul>
        <h2 class="title is-4">Your sessions.</h2>
        {#each userSessions as userSession}
            <li class="block">
                <p>{ userSession.userAgent }</p>
                <p>{ userSession.dateCreated }</p>
                <p>{ userSession.dateExpires }</p>
            </li>
        {/each}
    </ul>
</div>
