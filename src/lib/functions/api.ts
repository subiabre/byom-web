/**
 * The base URL of the API, e.g: `http://192.168.0.1:56903`
 */
export const baseUrl = [
    'http://',
    import.meta.env.VITE_API_ADDR,
    ':',
    import.meta.env.VITE_API_PORT,
].join('');

export interface RequestInitJson extends RequestInit
{
    jsonBody: any
} 

export const api = {
    /**
     * Perform a fetch request to the API path
     * @param path Full path inside API, e.g: `/api/users`
     * @param init 
     * @returns
     */
    fetch: async (path: string, init?: RequestInit) => {
        return await fetch(baseUrl.concat(path), {
            ...init,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...init?.headers,
            }
        });
    },

    /**
     * Perform a GET request to the API path
     * @param path Must inlude leading slash, e.g: `/users`
     * @param init 'method' will be overriden to GET
     * @returns 
     */
    get: async (path: string, init?: RequestInit) => {
        return api.fetch(['/api', path].join(''), {
            ...init,
            method: 'GET'
        });
    },

    /**
     * Perform a POST request to the API path using JSON
     * @param path Must include leading slash, e.g: `/users`
     * @param init 'body' will be encoded as JSON, 'method' will be overriden to POST
     * @returns 
     */
    post: async (path: string, init?: RequestInitJson) => {
        return api.fetch(['/api', path].join(''), {
            ...init,
            body: JSON.stringify(init?.jsonBody),
            method: 'POST'
        });
    },
}
