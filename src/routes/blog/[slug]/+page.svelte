<script lang="ts">
	let { data } = $props();
	const Content = $derived(data.Content as any);

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.meta.title} — Matthew Troke</title>
	{#if data.meta.description}
		<meta name="description" content={data.meta.description} />
	{/if}
</svelte:head>

<div class="topbar">
	<div class="topbar-inner">
		<a class="back" href="/blog">
			<span class="arr">←</span> matthew<span style="color:var(--ink-mute)">.</span>troke
			<span style="color:var(--ink-faint); margin-left:6px;">~/blog</span>
		</a>
		<div class="tag">§ Writing · Post</div>
	</div>
</div>

<main>
	<section class="hero">
		<div class="container">
			<div class="hero-grid">
				<div class="sec-num">
					{formatDate(data.meta.date)}
				</div>
				<div>
					<div class="kicker">
						<span style="color:var(--accent)">●</span> post
					</div>
					<h1 class="hero-title">{data.meta.title}</h1>
					{#if data.meta.description}
						<p class="hero-sub">{data.meta.description}</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section class="body-sec">
		<div class="container">
			<div class="hero-grid">
				<div></div>
				<article class="post-body">
					<Content />
				</article>
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="inner">
		<a href="/blog" class="back-link">← All posts</a>
		<div>© 2026 Matthew Troke</div>
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
		padding: 80px 0 56px;
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
		font-size: 64px;
		line-height: 1.02;
		letter-spacing: -0.02em;
		margin: 0 0 20px;
		color: var(--ink);
	}
	.hero-sub {
		color: var(--ink-dim);
		font-size: 15px;
		line-height: 1.75;
		max-width: 680px;
		margin: 0;
	}

	.body-sec {
		padding: 64px 0 96px;
	}

	.post-body {
		max-width: 720px;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		color: var(--ink-dim);
		font-size: 14px;
		line-height: 1.85;
	}

	.post-body :global(> *:first-child) {
		margin-top: 0;
	}
	.post-body :global(> *:last-child) {
		margin-bottom: 0;
	}

	.post-body :global(p) {
		margin: 0 0 1.4em;
	}
	.post-body :global(strong) {
		color: var(--ink);
		font-weight: 600;
	}
	.post-body :global(em) {
		font-style: italic;
		color: var(--ink);
	}
	.post-body :global(a) {
		color: var(--accent);
		border-bottom: 1px dashed rgba(126, 231, 135, 0.4);
		transition: border-color 0.15s;
	}
	.post-body :global(a:hover) {
		border-bottom-color: var(--accent);
	}
	.post-body :global(del) {
		color: var(--ink-mute);
	}

	.post-body :global(h1),
	.post-body :global(h2),
	.post-body :global(h3),
	.post-body :global(h4),
	.post-body :global(h5),
	.post-body :global(h6) {
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-style: italic;
		color: var(--ink);
		letter-spacing: -0.01em;
		line-height: 1.15;
	}
	.post-body :global(h1) {
		font-size: 40px;
		margin: 2.4em 0 0.6em;
	}
	.post-body :global(h2) {
		font-size: 32px;
		margin: 2.2em 0 0.6em;
		padding-top: 1.2em;
		border-top: 1px solid var(--line);
	}
	.post-body :global(h3) {
		font-size: 24px;
		margin: 2em 0 0.5em;
	}
	.post-body :global(h4) {
		font-size: 19px;
		margin: 1.8em 0 0.5em;
	}
	.post-body :global(h5),
	.post-body :global(h6) {
		font-family: 'JetBrains Mono', monospace;
		font-style: normal;
		font-size: 13px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--ink-mute);
		margin: 1.6em 0 0.5em;
	}

	.post-body :global(ul),
	.post-body :global(ol) {
		margin: 0 0 1.4em;
		padding-left: 22px;
	}
	.post-body :global(li) {
		margin: 0.3em 0;
	}
	.post-body :global(ul) {
		list-style: none;
		padding-left: 0;
	}
	.post-body :global(ul li) {
		padding-left: 22px;
		position: relative;
	}
	.post-body :global(ul li::before) {
		content: '›';
		color: var(--accent);
		position: absolute;
		left: 4px;
		top: 0;
		font-weight: 500;
	}
	.post-body :global(ol) {
		list-style: none;
		counter-reset: ol;
		padding-left: 0;
	}
	.post-body :global(ol li) {
		counter-increment: ol;
		padding-left: 28px;
		position: relative;
	}
	.post-body :global(ol li::before) {
		content: counter(ol, decimal-leading-zero);
		color: var(--accent);
		position: absolute;
		left: 0;
		top: 0;
		font-size: 11px;
		letter-spacing: 0.06em;
		padding-top: 5px;
	}
	.post-body :global(li input[type='checkbox']) {
		margin-right: 6px;
		accent-color: var(--accent);
	}

	.post-body :global(blockquote) {
		margin: 1.6em 0;
		padding: 4px 0 4px 20px;
		border-left: 2px solid var(--accent);
		color: var(--ink);
		font-style: italic;
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 19px;
		line-height: 1.6;
	}
	.post-body :global(blockquote p) {
		margin: 0 0 0.6em;
	}
	.post-body :global(blockquote p:last-child) {
		margin-bottom: 0;
	}
	.post-body :global(blockquote blockquote) {
		font-size: 0.92em;
		margin: 0.6em 0;
	}

	.post-body :global(hr) {
		border: 0;
		height: 1px;
		background: var(--line);
		margin: 2.4em 0;
	}

	.post-body :global(code) {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 0.88em;
		padding: 2px 6px;
		background: var(--bg-elev);
		border: 1px solid var(--line);
		border-radius: 4px;
		color: var(--accent);
	}
	.post-body :global(pre) {
		margin: 1.6em 0;
		padding: 18px 20px;
		background: var(--bg-elev) !important;
		border: 1px solid var(--line);
		border-radius: 8px;
		overflow-x: auto;
		font-size: 12.5px;
		line-height: 1.65;
	}
	.post-body :global(pre code) {
		padding: 0;
		background: transparent;
		border: 0;
		border-radius: 0;
		font-size: inherit;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}
	.post-body :global(pre.shiki),
	.post-body :global(pre.shiki span) {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
	}

	.post-body :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.6em 0;
		font-size: 13px;
	}
	.post-body :global(th),
	.post-body :global(td) {
		text-align: left;
		padding: 10px 14px;
		border-bottom: 1px solid var(--line);
	}
	.post-body :global(th) {
		color: var(--ink-mute);
		font-weight: 500;
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		border-bottom-color: var(--line-strong);
	}
	.post-body :global(td) {
		color: var(--ink-dim);
	}
	.post-body :global(tr:last-child td) {
		border-bottom: 0;
	}

	.post-body :global(img) {
		max-width: 100%;
		border: 1px solid var(--line);
		border-radius: 8px;
		margin: 1.6em 0;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	footer .back-link {
		color: var(--ink-dim);
		transition: color 0.15s;
	}
	footer .back-link:hover {
		color: var(--accent);
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
			font-size: 44px;
		}
	}
</style>
