import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'OrderCLI App',
				short_name: 'OrderCLI',
				description: 'OrderCLI PWA',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/public',
				icons: [
					{
						src: 'icon.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icon.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	optimizeDeps: {
		exclude: ['lucide-react'],
	},
});
