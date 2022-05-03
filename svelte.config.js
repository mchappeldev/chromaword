import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	files: {
		assets: 'static',
		hooks: 'src/hooks',
		lib: 'src/lib',
		params: 'src/params',
		routes: 'src/routes',
		serviceWorker: 'static/pwabuilder-sw.js',
		template: 'src/app.html'
	}
};

export default config;
