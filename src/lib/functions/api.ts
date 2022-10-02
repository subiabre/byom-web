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
    ].join('')
}