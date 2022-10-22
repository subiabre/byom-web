import { sveltekit } from '@sveltejs/kit/vite';
import { socketio } from './src/lib/socket-io/plugin';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		socketio()
	],
	server: {
		port: 3000,
		strictPort: true
	},
	preview: {
		port: 3000,
		strictPort: true
	}
};

export default config;
