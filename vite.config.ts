import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
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