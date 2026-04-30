<svelte:head>
	<title>Statik Form — Matthew Troke</title>
</svelte:head>

<div class="topbar">
	<div class="topbar-inner">
		<a class="back" href="/">
			<span class="arr">←</span> matthew<span style="color:var(--ink-mute)">.</span>troke
			<span style="color:var(--ink-faint); margin-left:6px;">~/projects/statik-form</span>
		</a>
		<div class="tag">§ 02 / Case Study · 001</div>
	</div>
</div>

<main>
	<section class="hero">
		<div class="container">
			<div class="hero-grid">
				<div class="sec-num">
					№ <b>001</b><br /><span style="color:var(--ink-faint)">2026 —</span>
				</div>
				<div>
					<div
						style="color:var(--ink-mute); font-size:11px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:16px;"
					>
						<span style="color:var(--accent)">●</span> statikform.com — live · founder &amp; engineer
					</div>
					<h1 class="hero-title">Statik <span class="i">Form.</span></h1>
					<p class="hero-sub">
						Form backend for static sites — <strong>built end-to-end</strong> on the Cloudflare edge
						stack. An endpoint, a snippet, and forms on any static site start working: no backend, no
						database, no fuss. Optional drag-and-drop form builder, integrations with every major
						static host, and submissions piped to Email, Slack, Discord, or webhooks.
					</p>

					<div class="meta">
						<div>
							<div class="k">Role</div>
							<div class="v">Solo founder &amp; engineer</div>
						</div>
						<div>
							<div class="k">Timeline</div>
							<div class="v">2026 — <b>Present</b></div>
						</div>
						<div>
							<div class="k">Stack</div>
							<div class="v">SvelteKit · Cloudflare</div>
						</div>
						<div>
							<div class="k">Status</div>
							<div class="v"><b>● Live</b></div>
						</div>
					</div>

					<figure class="shot hero-shot">
						<img src="/statikform/01_hero.png" alt="Statik Form homepage hero" loading="eager" />
					</figure>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>01</b> / Context</div>
				<h2 class="sec-title">
					Why build another form backend?<em>The shape of the problem — and the opening I saw.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<div class="cards-2">
					<div class="card">
						<div class="tag"><span class="sq"></span>Problem</div>
						<h3>Form handling on static sites is a papercut industry.</h3>
						<p>
							Every static site — SvelteKit, Astro, Next static, a plain Jekyll blog — eventually needs
							a form. The existing tools either charge per-submission, ship clunky embeds, or hand you
							CAPTCHAs that punish real users just to block obvious bots.
						</p>
						<p>
							And the setup is always more work than it should be: sign up, configure SMTP, wire up a
							third-party spam service, write markup by hand, test in prod.
						</p>
					</div>
					<div class="card good">
						<div class="tag"><span class="sq"></span>Approach</div>
						<h3>An endpoint, a snippet — done.</h3>
						<p>
							Everything runs on Cloudflare's primitives — no origin server, no container, no cold
							start. You get a URL to POST to, paste a snippet (or use the form builder), and
							submissions land in your inbox, Slack, Discord, or a webhook.
						</p>
						<p>
							Honeypot, rate limiting, and optional reCAPTCHA v3 handle spam in the background. Real
							humans never see a challenge.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>02</b> / Product</div>
				<h2 class="sec-title">
					An endpoint. A snippet. Done.<em>Paste-in HTML, or design the whole form in the builder.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<div class="stacked-shots">
					<figure class="shot">
						<figcaption>Drop-in snippet — no JavaScript, no client SDK, just HTML.</figcaption>
						<img src="/statikform/02_endpoint_snippet.png" alt="Statik Form endpoint snippet section" loading="lazy" />
					</figure>
					<figure class="shot">
						<figcaption>Or skip the HTML entirely — design the form in the dashboard builder.</figcaption>
						<img src="/statikform/03_form_builder.png" alt="Statik Form form builder with two styled examples" loading="lazy" />
					</figure>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>03</b> / Integrations</div>
				<h2 class="sec-title">
					Works with whatever you're already using.<em>If it ships HTML, it works.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<figure class="shot">
					<img src="/statikform/04_integrations_grid.png" alt="Grid of supported platforms: WordPress, Squarespace, Wix, Shopify, Webflow, Framer, Next.js, Astro, GitHub Pages, Vercel, Netlify, Cloudflare Pages" loading="lazy" />
				</figure>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>04</b> / Connections</div>
				<h2 class="sec-title">
					Send submissions wherever you want them.<em>Email, Discord, Slack, or any webhook.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<figure class="shot">
					<img src="/statikform/05_connections.png" alt="Connection options: Email, Discord, Slack, Webhooks" loading="lazy" />
				</figure>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>05</b> / Features</div>
				<h2 class="sec-title">
					Engineering notes.<em>What makes this interesting to build.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<div class="feats">
					<div class="feat">
						<h4>Honeypot + rate limiting + reCAPTCHA v3</h4>
						<p>
							Bots and sketchy marketing offers never make it to the inbox. Spam is handled at the
							edge without CAPTCHAs that punish real users.
						</p>
					</div>
					<div class="feat">
						<h4>Zero-config drop-in</h4>
						<p>
							One URL, one <code>&lt;form&gt;</code>. No JavaScript required, no iframe embed, no client
							SDK. Works with every static site generator and every framework.
						</p>
					</div>
					<div class="feat">
						<h4>Form builder</h4>
						<p>
							Design the whole form in the dashboard — fields, colors, fonts, the lot — then drop a
							few lines into your site. Multiple style presets ship out of the box.
						</p>
					</div>
					<div class="feat">
						<h4>Edge-first data path</h4>
						<p>
							Workers handle the hot path, D1 stores submissions, and KV caches per-form config on
							every PoP — so the request never waits on a cold origin.
						</p>
					</div>
					<div class="feat">
						<h4>Connections + webhooks</h4>
						<p>
							Email, Slack, Discord, and signed HMAC webhooks to any URL. Wire up Zapier, Make, or
							your own backend without writing delivery logic.
						</p>
					</div>
					<div class="feat">
						<h4>Built solo</h4>
						<p>
							Landing page, dashboard, API, billing, ops, docs — designed, built, deployed, and
							operated by one person. The whole product lives in a single repo.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>06</b> / Pricing</div>
				<h2 class="sec-title">
					Free until you're getting a <em style="font-family:inherit; font-style:italic;">lot</em> of messages.
					<em>Three tiers, full feature comparison.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<div class="stacked-shots">
					<figure class="shot">
						<img src="/statikform/07_pricing.png" alt="Pricing tiers: Free, Pro ($9/mo), Business ($29/mo)" loading="lazy" />
					</figure>
					<figure class="shot">
						<img src="/statikform/08_comparison_table.png" alt="Full feature comparison table across Free, Pro, and Business tiers" loading="lazy" />
					</figure>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>07</b> / Stack</div>
				<h2 class="sec-title">
					Under the hood.<em>Every choice made to stay on the edge.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<div class="stacklist">
					<div>
						<div class="k">Frontend</div>
						<ul>
							<li>SvelteKit</li>
							<li>TypeScript</li>
							<li>Tailwind</li>
						</ul>
					</div>
					<div>
						<div class="k">Edge</div>
						<ul>
							<li>Workers</li>
							<li>Workflows</li>
							<li>Durable Objects</li>
						</ul>
					</div>
					<div>
						<div class="k">Data</div>
						<ul>
							<li>D1 (SQLite)</li>
							<li>KV</li>
							<li>R2 (uploads)</li>
						</ul>
					</div>
					<div>
						<div class="k">Ops</div>
						<ul>
							<li>Stripe</li>
							<li>Resend</li>
							<li>reCAPTCHA v3</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="cta">
		<div class="container">
			<h2>
				See it
				<span
					style="color:var(--accent); font-style:normal; font-family:'JetBrains Mono',monospace; font-size:0.8em;"
				>→</span>
				in production.
			</h2>
			<p>Live at statikform.com — drop in a form tag and you're done.</p>
			<div class="cta-btns">
				<a class="btn primary" href="https://statikform.com" target="_blank" rel="noopener">
					Visit statikform.com →
				</a>
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="inner">
		<div>© 2026 Matthew Troke</div>
		<div><a class="link" href="/">← back to portfolio</a></div>
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

	.hero-title {
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-size: 96px;
		line-height: 0.95;
		letter-spacing: -0.03em;
		margin: 0 0 24px;
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
		margin-bottom: 28px;
	}
	.hero-sub :global(strong) {
		color: var(--ink);
		font-weight: 500;
	}

	.meta {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0;
		border: 1px solid var(--line);
		border-radius: 8px;
		margin-top: 32px;
		background: var(--bg-elev);
	}
	.meta > div {
		padding: 16px 20px;
		border-right: 1px solid var(--line);
	}
	.meta > div:last-child { border-right: 0; }
	.meta .k {
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-mute);
		margin-bottom: 6px;
	}
	.meta .v {
		color: var(--ink);
		font-size: 13px;
		font-weight: 500;
	}
	.meta .v :global(b) {
		color: var(--accent);
		font-weight: 500;
	}

	.shot {
		margin: 0;
		border: 1px solid var(--line);
		border-radius: 10px;
		background: var(--bg-elev);
		overflow: hidden;
	}
	.shot img {
		display: block;
		width: 100%;
		height: auto;
	}
	.shot figcaption {
		padding: 10px 16px;
		border-bottom: 1px solid var(--line);
		font-size: 11px;
		color: var(--ink-mute);
		letter-spacing: 0.06em;
	}
	.hero-shot { margin-top: 40px; }

	.stacked-shots {
		display: grid;
		gap: 20px;
	}

	.sec {
		padding: 80px 0;
		border-bottom: 1px solid var(--line);
	}
	.sec-head {
		display: grid;
		grid-template-columns: 140px 1fr;
		gap: 32px;
		align-items: baseline;
		margin-bottom: 40px;
	}
	.sec-title {
		font-family: 'Instrument Serif', Georgia, serif;
		font-style: italic;
		font-weight: 400;
		font-size: 40px;
		line-height: 1.05;
		letter-spacing: -0.01em;
		margin: 0;
	}
	.sec-title :global(em) {
		font-style: normal;
		display: block;
		margin-top: 10px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		color: var(--ink-dim);
		letter-spacing: 0;
	}
	.sec-body {
		display: grid;
		grid-template-columns: 140px 1fr;
		gap: 32px;
	}

	.cards-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}
	.card {
		border: 1px solid var(--line);
		border-radius: 10px;
		background: var(--bg-elev);
		padding: 24px 26px;
	}
	.card .tag {
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-mute);
		margin-bottom: 10px;
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.card .tag .sq {
		width: 8px;
		height: 8px;
		background: var(--orange);
	}
	.card.good .tag .sq { background: var(--accent); }
	.card h3 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-style: italic;
		font-weight: 400;
		font-size: 24px;
		line-height: 1.1;
		margin: 0 0 10px;
	}
	.card p {
		margin: 0 0 10px;
		color: var(--ink-dim);
		font-size: 13px;
		line-height: 1.7;
	}
	.card p:last-child { margin-bottom: 0; }

	.feats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 28px 32px;
	}
	.feat {
		padding-left: 24px;
		position: relative;
	}
	.feat::before {
		content: '';
		position: absolute;
		left: 0;
		top: 8px;
		width: 14px;
		height: 1px;
		background: var(--accent);
	}
	.feat h4 {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 500;
		font-size: 13px;
		margin: 0 0 6px;
		color: var(--ink);
	}
	.feat p {
		margin: 0;
		color: var(--ink-dim);
		font-size: 13px;
		line-height: 1.7;
	}
	.feat p :global(code) {
		font-family: 'JetBrains Mono', monospace;
		background: var(--bg-elev-2);
		padding: 1px 6px;
		border-radius: 3px;
		color: var(--ink);
		font-size: 12px;
	}

	.stacklist {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0;
		border: 1px solid var(--line);
		border-radius: 8px;
	}
	.stacklist > div {
		padding: 22px;
		border-right: 1px solid var(--line);
	}
	.stacklist > div:last-child { border-right: 0; }
	.stacklist .k {
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-mute);
		margin-bottom: 14px;
	}
	.stacklist ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.stacklist li {
		padding: 4px 0;
		font-size: 12px;
		color: var(--ink);
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.stacklist li::before {
		content: '›';
		color: var(--accent);
	}

	.cta {
		padding: 80px 0;
		text-align: center;
	}
	.cta h2 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-style: italic;
		font-weight: 400;
		font-size: 52px;
		margin: 0 0 16px;
		letter-spacing: -0.02em;
	}
	.cta p {
		color: var(--ink-dim);
		margin: 0 auto 28px;
		max-width: 520px;
	}
	.cta-btns {
		display: inline-flex;
		gap: 12px;
	}
	.btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		padding: 12px 18px;
		border: 1px solid var(--line-strong);
		background: transparent;
		color: var(--ink);
		border-radius: 6px;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.15s;
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.btn:hover {
		border-color: var(--accent);
		color: var(--accent);
	}
	.btn.primary {
		background: var(--accent);
		color: #0a0b0d;
		border-color: var(--accent);
		font-weight: 600;
	}
	.btn.primary:hover {
		background: transparent;
		color: var(--accent);
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
	}

	@media (max-width: 900px) {
		.hero-title { font-size: 56px; }
		.hero-grid,
		.sec-head,
		.sec-body {
			grid-template-columns: 1fr;
		}
		.sec-num {
			border-top: 0;
			padding-top: 0;
		}
		.meta { grid-template-columns: 1fr 1fr; }
		.meta > div {
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}
		.cards-2,
		.feats,
		.stacklist {
			grid-template-columns: 1fr;
		}
		.stacklist > div {
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}
	}
</style>
