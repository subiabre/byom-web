import { from } from "$lib/net";

export function createApiClient(env: NodeJS.ProcessEnv)
{
    const net = from(env);

    return new ApiClient(net.api);
}

export interface RequestInitJson extends RequestInit
{
    jsonBody: any
}

export class ApiClient
{
    constructor(baseUrl: string)
    {
        this.baseUrl = baseUrl;
    }

    baseUrl: string = '';

    /**
     * Perform a fetch request to the API path
     * @param path Full path inside API, e.g: `/api/users`
     * @param init 
     * @returns
     */
    async fetch(path: string, init?: RequestInit)
    {
        return await fetch(this.baseUrl.concat(path), {
            ...init,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...init?.headers,
            }
        });
    }

    /**
     * Perform a GET request to the API path
     * @param path Must inlude leading slash, e.g: `/users`
     * @param init 'method' will be overriden to GET
     * @returns 
     */
    async get(path: string, init?: RequestInit)
    {
        return this.fetch(['/api', path].join(''), {
            ...init,
            method: 'GET'
        });
    };

    /**
     * Perform a POST request to the API path using JSON
     * @param path Must include leading slash, e.g: `/users`
     * @param init 'body' will be encoded as JSON, 'method' will be overriden to POST
     * @returns 
     */
    async post(path: string, init?: RequestInitJson)
    {
        return this.fetch(['/api', path].join(''), {
            ...init,
            body: JSON.stringify(init?.jsonBody),
            method: 'POST'
        });
    };
}
