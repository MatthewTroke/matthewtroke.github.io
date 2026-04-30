<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Blog — Matthew Troke</title>
</svelte:head>

<main class="prose mx-auto max-w-2xl px-6 py-16">
	<h1>Blog</h1>
	{#if data.posts.length === 0}
		<p>No posts yet.</p>
	{:else}
		<ul class="not-prose space-y-4">
			{#each data.posts as post (post.slug)}
				<li>
					<a href="/blog/{post.slug}" class="block">
						<div class="font-medium">{post.title}</div>
						{#if post.description}
							<div class="text-sm opacity-70">{post.description}</div>
						{/if}
						<div class="text-xs opacity-50">
							{new Date(post.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>
