import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

type PostModule = {
	default: unknown;
	metadata: {
		title: string;
		date: string;
		description?: string;
		draft?: boolean;
	};
};

const modules = import.meta.glob<PostModule>('/src/content/posts/*.md', { eager: true });

export const entries: EntryGenerator = () => {
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop()!.replace(/\.md$/, '')
	}));
};

export const load: PageLoad = ({ params }) => {
	const path = `/src/content/posts/${params.slug}.md`;
	const mod = modules[path];
	if (!mod) throw error(404, 'Post not found');
	return {
		Content: mod.default,
		meta: mod.metadata
	};
}
