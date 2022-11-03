/**
 * @param {NodeJS.ProcessEnv} env
 * @return {NetAddress}
 */
export function createNetFrom(env: ImportMetaEnv): NetAddress
{
    const base = [
        'http://',
        env.VITE_NET_ADDR,
        ':',
    ].join('');

    return {
        web: {
            addr: base.concat(env.VITE_WEB_PORT || ''),
            port: parseInt(env.VITE_WEB_PORT || ''),
        },
        api: {
            addr: base.concat(env.VITE_API_PORT || ''),
            port: parseInt(env.VITE_API_PORT || ''),
        }
    }
}

export class NetAddress
{
    
    web = {
        /**
         * e.g: `http://127.0.0.1:56903`
         * @type {string}
         */
        addr: '',

        /**
         * e.g: `56903`
         * @type {number}
         */
        port: 0
    };

    api = {
        /**
         * e.g: `http://127.0.0.1:56904`
         * @type {string}
         */
         addr: '',

         /**
          * e.g: `56904`
          * @type {number}
          */
         port: 0
    };
}
