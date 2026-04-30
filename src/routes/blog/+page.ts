export const prerender = true;

type PostMeta = {
	title: string;
	date: string;
	description?: string;
	draft?: boolean;
};

export async function load() {
	const modules = import.meta.glob<{ metadata: PostMeta }>('/src/content/posts/*.md', {
		eager: true
	});

	const posts = Object.entries(modules)
		.map(([path, mod]) => {
			const slug = path.split('/').pop()!.replace(/\.md$/, '');
			return { slug, ...mod.metadata };
		})
		.filter((p) => !p.draft)
		.sort((a, b) => +new Date(b.date) - +new Date(a.date));

	return { posts };
}
