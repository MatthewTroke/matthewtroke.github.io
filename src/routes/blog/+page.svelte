<script lang="ts">
	let { data } = $props();

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog — Matthew Troke</title>
</svelte:head>

<div class="topbar">
	<div class="topbar-inner">
		<a class="back" href="/">
			<span class="arr">←</span> matthew<span style="color:var(--ink-mute)">.</span>troke
			<span style="color:var(--ink-faint); margin-left:6px;">~/blog</span>
		</a>
		<div class="tag">§ Writing · Index</div>
	</div>
</div>

<main>
	<section class="hero">
		<div class="container">
			<div class="hero-grid">
				<div class="sec-num">
					№ <b>—</b><br /><span style="color:var(--ink-faint)">2026 —</span>
				</div>
				<div>
					<div class="kicker">
						<span style="color:var(--accent)">●</span> notes &amp; write-ups
					</div>
					<h1 class="hero-title">Blog<span class="i">.</span></h1>
					<p class="hero-sub">
						Engineering, products, and the occasional teardown.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="hero-grid">
				<div class="sec-num">§ <b>{String(data.posts.length).padStart(2, '0')}</b> / Posts</div>
				<div>
					{#if data.posts.length === 0}
						<div class="empty">No posts yet — check back soon.</div>
					{:else}
						<div class="post-list">
							{#each data.posts as post (post.slug)}
								<a class="post" href="/blog/{post.slug}">
									<div class="post-meta">
										<span>{formatDate(post.date)}</span>
										<span class="arr">↗</span>
									</div>
									<h2>{post.title}</h2>
									{#if post.description}
										<p>{post.description}</p>
									{/if}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="inner">
		<div>© 2026 Matthew Troke · Built from scratch · Hosted on the edge</div>
	</div>
</footer>

<style>
	.container {
		max-width: 1180px;
		margin: 0 auto;
		padding: 0 32px;
	}

	.topbar {
		position: sticky;
		top: 0;
		z-index: 20;
		backdrop-filter: blur(12px);
		background: rgba(10, 11, 13, 0.72);
		border-bottom: 1px solid var(--line);
	}
	.topbar-inner {
		max-width: 1180px;
		margin: 0 auto;
		padding: 12px 32px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
	}
	.back {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--ink-dim);
		transition: color 0.15s;
	}
	.back:hover { color: var(--accent); }
	.back :global(.arr) { color: var(--accent); }
	.topbar .tag {
		color: var(--ink-mute);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.hero {
		padding: 80px 0 64px;
		border-bottom: 1px solid var(--line);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 140px 1fr;
		gap: 32px;
	}
	.sec-num {
		color: var(--ink-mute);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		border-top: 1px solid var(--line-strong);
		padding-top: 8px;
	}
	.sec-num :global(b) {
		color: var(--accent);
		font-weight: 500;
	}
	.kicker {
		color: var(--ink-mute);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		margin-bottom: 16px;
	}
	.hero-title {
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-size: 96px;
		line-height: 0.95;
		letter-spacing: -0.03em;
		margin: 0 0 24px;
		color: var(--ink);
	}
	.hero-title :global(.i) {
		font-style: italic;
		color: var(--accent);
	}
	.hero-sub {
		color: var(--ink-dim);
		font-size: 15px;
		line-height: 1.75;
		max-width: 680px;
		margin: 0;
	}

	.sec {
		padding: 64px 0 96px;
	}

	.post-list {
		display: flex;
		flex-direction: column;
	}
	.post {
		display: block;
		padding: 28px 0;
		border-top: 1px solid var(--line);
		transition:
			padding-left 0.2s,
			color 0.15s;
	}
	.post:last-of-type {
		border-bottom: 1px solid var(--line);
	}
	.post:hover {
		padding-left: 8px;
	}
	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-mute);
		margin-bottom: 10px;
	}
	.post-meta :global(.arr) {
		color: var(--ink-faint);
		transition:
			color 0.15s,
			transform 0.2s;
	}
	.post:hover .post-meta :global(.arr) {
		color: var(--accent);
		transform: translate(3px, -3px);
	}
	.post h2 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-style: italic;
		font-size: 32px;
		line-height: 1.1;
		letter-spacing: -0.01em;
		margin: 0 0 8px;
		color: var(--ink);
	}
	.post:hover h2 {
		color: var(--accent);
	}
	.post p {
		margin: 0;
		color: var(--ink-dim);
		font-size: 13px;
		line-height: 1.7;
		max-width: 680px;
	}
	.empty {
		padding: 28px 0;
		color: var(--ink-mute);
		font-size: 13px;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
	}

	footer {
		padding: 22px 0;
		border-top: 1px solid var(--line);
		font-size: 11px;
		color: var(--ink-mute);
	}
	footer .inner {
		max-width: 1180px;
		margin: 0 auto;
		padding: 0 32px;
	}

	@media (max-width: 720px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}
		.sec-num {
			border-top: 0;
			padding-top: 0;
		}
		.hero-title {
			font-size: 64px;
		}
	}
</style>
