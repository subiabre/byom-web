<script lang="ts">
    import { goto } from "$app/navigation";
    import { createApiClient } from "$lib/functions/api";
    import parser from "ua-parser-js";
    import { onMount } from "svelte";
    import { user } from "$lib/stores/user";
    import { createNetFrom } from "$lib/functions/net";

    let api = createApiClient(createNetFrom(import.meta.env).api.addr);
    let userSessions: any[] = [];
    let currentSession: any = {};

    function parseUserAgent(userAgent: string) {
        const parsed = parser(userAgent);

        if (!parsed?.browser.name) return userAgent;

        return `${parsed.browser.name} ${parsed.browser.version} on ${parsed.os.name}`;
    }

    onMount(async () => {
        const response = await api.get("/auth/user");

        switch (response.status) {
            case 204:
                currentSession = await api
                    .fetch(response.headers.get("Location") ?? "")
                    .then((res) => res.json());
                userSessions = await api
                    .get("/user_sessions")
                    .then((res) => res.json())
                    .then((data) =>
                        data.map((data: any) => {
                            return {
                                ...data,
                                dateCreated: new Date(data.dateCreated),
                                dateExpires: new Date(data.dateExpires),
                                userAgent: parseUserAgent(data.userAgent),
                            };
                        })
                    );
                break;

            default:
                goto("/user/signin");
                break;
        }
    });
</script>

<svelte:head>
    <title>User.</title>
</svelte:head>

<div class="container mb-6">
    <h1 class="title">Hello, {$user.username}.</h1>
    <p class="subtitle">How you've been?</p>
</div>

<div class="container">
    <ul>
        <h2 class="title is-4">Your sessions.</h2>
        {#each userSessions as userSession}
            <li class="block">
                <h3 class="title is-6">
                    {userSession.userAgent}
                </h3>
                <div class="subtitle is-6">
                    {#if userSession.id === currentSession.id}
                        <p>Current</p>
                    {/if}
                    <p title={userSession.dateCreated.toLocaleString()}>
                        Created at: {userSession.dateCreated.toLocaleDateString()}
                    </p>
                    <p title={userSession.dateExpires.toLocaleString()}>
                        Expires at: {userSession.dateExpires.toLocaleDateString()}
                    </p>
                </div>
            </li>
        {/each}
    </ul>
</div>
