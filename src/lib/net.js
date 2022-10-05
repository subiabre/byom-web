/**
 * @param {{ VITE_NET_ADDR: string; VITE_WEB_PORT: string; VITE_API_PORT: string; }} env
 * @return {NetAddress}
 */
export function from(env)
{
    const base = [
        'http://',
        env.VITE_NET_ADDR,
        ':',
    ].join('');

    return {
        web: base.concat(env.VITE_WEB_PORT),
        api: base.concat(env.VITE_API_PORT),
    }
}

export class NetAddress
{
    /**
     * e.g: `http://127.0.0.1:56903`
     * @type {string}
     */
    web = '';
    
    /**
     * e.g: `http://127.0.0.1:56904`
     * @type {string}
     */
    api = '';
}
