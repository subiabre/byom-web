<script lang="ts">
    import { goto } from "$app/navigation";
    import { createApiClient } from "$lib/functions/api";
    import { createNetFrom } from "$lib/functions/net";
    import { user } from "$lib/stores/user";
    import { onMount } from "svelte";

    export let data: { token?: string };

    let api = createApiClient(createNetFrom(import.meta.env).api.addr);

    let username: string;
    let password: string;

    async function isLoggedIn() {
        return goto("/user");
    }
    
    async function loadUser(response: Response) {
        await api
            .fetch(response.headers.get("Location") ?? "")
            .then((res) => res.json())
            .then((data) => user.set(data.user));
        return isLoggedIn();
    }

    async function handleLogin(response: Response) {
        switch (response.status) {
            case 204:
                return await loadUser(response);
            default:
                await response
                    .json()
                    .then(res => alert(res.error));
                break;
        }
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        const response = await api.post("/auth/user", {
            jsonBody: { username, password },
        });
        return handleLogin(response);
    }

    onMount(async () => {
        if (data.token) {
            const response = await api.post("/auth/token", {
                jsonBody: { token: data.token },
            });
            return handleLogin(response);
        }

        const response = await api.get("/auth/user");
        
        switch (response.status) {
            case 204:
                return await loadUser(response);
            default:
                break;
        }
    });
</script>

<svelte:head>
    <title>Sign in.</title>
</svelte:head>

<div class="container mb-6">
    <h1 class="title">Sign in.</h1>
    <p class="subtitle">Hello there.</p>
</div>

<div class="container">
    <form class="form" on:submit={handleSubmit}>
        <div class="field">
            <label class="label" for="inputUsername">Username</label>
            <input
                class="input"
                type="text"
                placeholder="username"
                id="inputUsername"
                bind:value={username}
            />
        </div>
        <div class="field">
            <label class="label" for="inputPassword">Password</label>
            <input
                class="input"
                type="password"
                placeholder="password"
                id="inputPassword"
                bind:value={password}
            />
        </div>
        <div class="field">
            <div class="control">
                <button class="button">Submit</button>
            </div>
        </div>
    </form>
</div>
