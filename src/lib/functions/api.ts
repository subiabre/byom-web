export interface RequestOptions
{
    body: any,
    method?: string
}

export const API = {
    /**
     * The base URL of the API
     */
    address: [
        'http://',
        import.meta.env.VITE_API_ADDR,
        ':',
        import.meta.env.VITE_API_PORT,
        '/api'
    ].join(''),

    /**
     * Perform a fetch request to the API path using JSON
     * @param path Must include leading slash
     * @param request 
     * @returns 
     */
    fetch: async (path: string, request?: RequestOptions) => {
        const response = await fetch(`${API.address}${path}`, {
            body: JSON.stringify(request?.body),
            method: request?.method ?? 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        return await response.json();
    }
}