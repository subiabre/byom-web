<script lang="ts">
    import { goto } from "$app/navigation";
    import { createApiClient } from "$lib/functions/api";
    import parser from "ua-parser-js";
    import { onMount } from "svelte";
    import { UserSocketsStore } from "$lib/socket-io/events/user-sockets-event";

    let api = createApiClient(import.meta.env);
    let user = { username: "" };
    let userSessions: any[] = [];

    UserSocketsStore.subscribe((data) => console.log(data.list));

    onMount(async () => {
        const response = await api.get("/auth/user");

        switch (response.status) {
            case 204:
                user = JSON.parse(localStorage.getItem("byom:user") ?? "{}");
                userSessions = await api
                    .get("/user_sessions")
                    .then((res) => res.json())
                    .then((data) =>
                        data.map((data: any) => {
                            return {
                                ...data,
                                dateCreated: new Date(data.dateCreated),
                                dateExpires: new Date(data.dateExpires),
                                userAgent: parser(data.userAgent),
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
    <h1 class="title">Hello, {user.username}.</h1>
    <p class="subtitle">How you've been?</p>
</div>

<div class="container">
    <ul>
        <h2 class="title is-4">Your sessions.</h2>
        {#each userSessions as userSession}
            <li class="block">
                <h3 class="title is-6">
                    {userSession.userAgent.browser.name}
                    {userSession.userAgent.browser.version} on
                    {userSession.userAgent.os.name}
                </h3>
                <div class="subtitle is-6">
                    <p title={ userSession.dateCreated.toLocaleString() }>
                        Created at: { userSession.dateCreated.toLocaleDateString() }
                    </p>
                    <p title={ userSession.dateExpires.toLocaleString() }>
                        Expires at: { userSession.dateExpires.toLocaleDateString() }
                    </p>
                </div>
            </li>
        {/each}
    </ul>
</div>
