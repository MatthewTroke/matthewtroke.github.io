<script lang="ts">
	let { data } = $props();
	const Content = $derived(data.Content as any);
</script>

<svelte:head>
	<title>{data.meta.title} — Matthew Troke</title>
	{#if data.meta.description}
		<meta name="description" content={data.meta.description} />
	{/if}
</svelte:head>

<main class="prose mx-auto max-w-2xl px-6 py-16">
	<header class="mb-8 not-prose">
		<a href="/blog" class="text-sm opacity-60 hover:opacity-100">← Blog</a>
		<h1 class="mt-4 text-3xl font-semibold">{data.meta.title}</h1>
		<div class="mt-2 text-sm opacity-60">
			{new Date(data.meta.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</div>
	</header>
	<Content />
</main>
