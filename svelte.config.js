import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

const theme = 'github-dark-dimmed';
const langs = ['ts', 'typescript', 'tsx', 'js', 'javascript', 'jsx', 'svelte', 'html', 'css', 'json', 'bash', 'sh', 'shell', 'md', 'markdown', 'yaml', 'yml', 'sql'];

const highlighter = await createHighlighter({ themes: [theme], langs });

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: (code, lang = 'text') => {
			const safeLang = langs.includes(lang) ? lang : 'text';
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang: safeLang, theme }));
			return `{@html \`${html}\`}`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		// Set base path for GitHub Pages
		// For username.github.io repositories, use empty string
		paths: {
			base: process.env.BASE_PATH || '',
			relative: false
		}
	}
};

export default config;
