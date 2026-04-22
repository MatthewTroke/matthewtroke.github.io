<svelte:head>
	<title>Neural Decks — Matthew Troke</title>
</svelte:head>

<div class="topbar">
	<div class="topbar-inner">
		<a class="back" href="/">
			<span class="arr">←</span> matthew<span style="color:var(--ink-mute)">.</span>troke
			<span style="color:var(--ink-faint); margin-left:6px;">~/projects/neural-decks</span>
		</a>
		<div class="tag">§ 02 / Case Study · 002</div>
	</div>
</div>

<main>
	<section class="hero">
		<div class="container">
			<div class="hero-grid">
				<div class="sec-num">
					№ <b>002</b><br /><span style="color:var(--ink-faint)">2025 —</span>
				</div>
				<div>
					<div
						style="color:var(--ink-mute); font-size:11px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:16px;"
					>
						<span style="color:var(--accent-2)">●</span> neuraldecks.app — live · founder &amp; engineer
					</div>
					<h1 class="hero-title">Neural <span class="i">Decks.</span></h1>
					<p class="hero-sub">
						Real-time multiplayer card game where users
						<strong>create, share, and play custom decks</strong> over WebSockets. An
						<strong>LLM pipeline</strong> turns a prompt into sixty playable cards on demand. Golang
						backend, SvelteKit frontend, Temporal for durable game orchestration, Stripe for premium
						currency — all self-hosted on Oracle Cloud and AWS.
					</p>

					<div class="meta">
						<div>
							<div class="k">Role</div>
							<div class="v">Solo founder &amp; engineer</div>
						</div>
						<div>
							<div class="k">Timeline</div>
							<div class="v">Jul 2025 — <b>Present</b></div>
						</div>
						<div>
							<div class="k">Stack</div>
							<div class="v">Go · SvelteKit · Temporal</div>
						</div>
						<div>
							<div class="k">Status</div>
							<div class="v"><b>● Live</b> · production</div>
						</div>
					</div>

					<div class="stage">
						<p class="stage-prompt">
							<q>The absolute worst name to give a Series A startup in 2026.</q>
						</p>
						<div class="card-row">
							<div class="pcard r1">
								<div class="top"><span>01 / 60</span><span>◆◆</span></div>
								<div class="body">ScamCoin but it's actually a 401(k)</div>
								<div class="foot"><span>common</span><span>2 votes</span></div>
							</div>
							<div class="pcard r2">
								<div class="top"><span>02 / 60</span><span>◆◆</span></div>
								<div class="body">BreadBasket.exe</div>
								<div class="foot"><span>common</span><span>1 vote</span></div>
							</div>
							<div class="pcard r3">
								<div class="top"><span class="lbl">★ WINNER</span><span>◆◆◆</span></div>
								<div class="body">LinkedIn but for ghosts</div>
								<div class="foot"><span style="color:var(--accent);">rare</span><span>4 votes</span></div>
							</div>
							<div class="pcard r4">
								<div class="top"><span>04 / 60</span><span>◆◆</span></div>
								<div class="body">Uber, but only for moving one single plant</div>
								<div class="foot"><span>common</span><span>0 votes</span></div>
							</div>
							<div class="pcard r5">
								<div class="top"><span>05 / 60</span><span>◆◆</span></div>
								<div class="body">A vibes-based accounting firm</div>
								<div class="foot"><span>common</span><span>1 vote</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>01</b> / Context</div>
				<h2 class="sec-title">
					Why real-time? Why AI cards?<em>The thing I wanted to exist — and didn't.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<div class="cards-2">
					<div class="card">
						<div class="tag"><span class="sq"></span>Starting Point</div>
						<h3>Party card games age out. Every. Single. Time.</h3>
						<p>
							You buy the deck, it's hilarious for a month, then half the cards reference something
							from 2014 and nobody laughs anymore. The format is great; the content is static.
						</p>
						<p>
							Meanwhile, LLMs got genuinely funny, and generating a whole deck from a prompt became
							cheap enough to do on-demand.
						</p>
					</div>
					<div class="card good">
						<div class="tag"><span class="sq"></span>Build</div>
						<h3>Infinite decks, real-time play, durable rooms.</h3>
						<p>
							Type a prompt — get a playable sixty-card deck in about twenty seconds. Spin up a room,
							invite friends, play over WebSockets. Cards are reactive and judged live by the host
							each round.
						</p>
						<p>
							The whole game loop is a Temporal workflow, so a dropped player, reconnect, or server
							restart never loses state. Premium currency and paid prompts run on Stripe.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>02</b> / Realtime</div>
				<h2 class="sec-title">
					Game state, live.<em>What a single round looks like over the wire.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<div class="ws-mock">
					<div class="ws-head">
						<div class="dots"><span></span><span></span><span></span></div>
						<span>ws://neuraldecks.app/room/ck82h · room: scrapyard</span>
						<span class="live">CONNECTED</span>
					</div>
					<div class="ws-body">
						<div class="msg"><span class="t">22:04:11</span><span class="dir sys">SYS</span><span class="c"><span class="k">room.started</span> · <span class="m">players: 4, judge: matt, deck:</span> <span class="s">"cursed startup names"</span></span></div>
						<div class="msg"><span class="t">22:04:12</span><span class="dir out">→ out</span><span class="c"><span class="k">round.prompt</span> &#123; <span class="k">id</span>: <span class="n">3</span>, <span class="k">text</span>: <span class="s">"worst Series A name"</span> &#125;</span></div>
						<div class="msg"><span class="t">22:04:14</span><span class="dir in">← in</span><span class="c"><span class="k">player.play</span> &#123; <span class="k">from</span>: <span class="s">"alex"</span>, <span class="k">card</span>: <span class="n">#27</span> &#125;</span></div>
						<div class="msg"><span class="t">22:04:15</span><span class="dir in">← in</span><span class="c"><span class="k">player.play</span> &#123; <span class="k">from</span>: <span class="s">"jay"</span>, <span class="k">card</span>: <span class="n">#03</span> &#125;</span></div>
						<div class="msg"><span class="t">22:04:18</span><span class="dir in">← in</span><span class="c"><span class="k">player.play</span> &#123; <span class="k">from</span>: <span class="s">"priya"</span>, <span class="k">card</span>: <span class="n">#44</span> &#125;</span></div>
						<div class="msg"><span class="t">22:04:21</span><span class="dir out">→ out</span><span class="c"><span class="k">round.reveal</span> &#123; <span class="k">cards</span>: [ <span class="n">#03</span>, <span class="n">#27</span>, <span class="n">#44</span> ] &#125;</span></div>
						<div class="msg"><span class="t">22:04:34</span><span class="dir in">← in</span><span class="c"><span class="k">judge.pick</span> &#123; <span class="k">winner</span>: <span class="n">#03</span> &#125;</span></div>
						<div class="msg"><span class="t">22:04:34</span><span class="dir sys">SYS</span><span class="c"><span class="k">temporal.checkpoint</span> · <span class="m">workflow state persisted</span></span></div>
						<div class="msg"><span class="t">22:04:34</span><span class="dir out">→ out</span><span class="c"><span class="k">round.awarded</span> &#123; <span class="k">to</span>: <span class="s">"jay"</span>, <span class="k">points</span>: <span class="n">1</span> &#125;</span></div>
						<div class="msg"><span class="t">22:04:35</span><span class="dir sys">SYS</span><span class="c"><span class="k">round.next</span> · <span class="m">preparing prompt 4 of 10</span></span></div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>03</b> / Engineering</div>
				<h2 class="sec-title">
					Engineering notes.<em>The interesting problems.</em>
				</h2>
			</div>
			<div class="sec-body">
				<div></div>
				<div class="feats">
					<div class="feat">
						<h4>LLM deck generation</h4>
						<p>
							A prompt becomes a sixty-card deck via a multi-step pipeline — theme expansion, card
							drafting, dedup pass, tone calibration. Cards are tagged with rarity and can reroll
							individually without regenerating the whole deck.
						</p>
					</div>
					<div class="feat">
						<h4>Temporal-backed game loop</h4>
						<p>
							Every room is a long-running Temporal workflow. Round transitions, timeouts, reconnects,
							and server restarts are all replayable events — the game cannot get stuck in an
							inconsistent state.
						</p>
					</div>
					<div class="feat">
						<h4>WebSocket fanout in Go</h4>
						<p>
							The Go server holds a connection per player and broadcasts room state diffs. Messages
							are small, typed, and versioned so the client can apply them optimistically and
							reconcile on ack.
						</p>
					</div>
					<div class="feat">
						<h4>Stripe premium currency</h4>
						<p>
							Users top up with "sparks" — used to buy custom deck generations, cosmetic card backs,
							and private rooms. Full purchase / refund / webhook flow built end-to-end on Stripe.
						</p>
					</div>
					<div class="feat">
						<h4>Self-hosted, owned end-to-end</h4>
						<p>
							No Vercel, no Fly, no managed Postgres. Oracle Cloud for the main compute, AWS for
							backups and CDN. Everything from the TLS cert to the DB schema is mine.
						</p>
					</div>
					<div class="feat">
						<h4>Designed as I built</h4>
						<p>
							Every screen — the lobby, the card reveal, the judging phase, the deck marketplace —
							designed and implemented by the same person. No handoff, no figma round-trip.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="sec">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>04</b> / Stack</div>
				<h2 class="sec-title">
					Under the hood.<em>Every piece, chosen for durability at small scale.</em>
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
						<div class="k">Backend</div>
						<ul>
							<li>Golang</li>
							<li>WebSockets</li>
							<li>Temporal</li>
						</ul>
					</div>
					<div>
						<div class="k">Data</div>
						<ul>
							<li>PostgreSQL</li>
							<li>Redis (pubsub)</li>
							<li>S3 (assets)</li>
						</ul>
					</div>
					<div>
						<div class="k">Infra &amp; Ops</div>
						<ul>
							<li>Oracle Cloud</li>
							<li>AWS</li>
							<li>Stripe</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="cta">
		<div class="container">
			<h2>
				Play a round
				<span
					style="color:var(--accent); font-style:normal; font-family:'JetBrains Mono',monospace; font-size:0.8em;"
				>→</span>
				yourself.
			</h2>
			<p>Live at neuraldecks.app — grab a prompt, bring three friends.</p>
			<div class="cta-btns">
				<a class="btn primary" href="https://neuraldecks.app" target="_blank" rel="noopener">
					Visit neuraldecks.app →
				</a>
				<a class="btn" href="/projects/statik-form">Previous case study ←</a>
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
	/* page-local accent (pink) — overrides base green for this page */
	:root {
		--accent: #f778ba;
		--accent-2: #7ee787;
	}

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

	.stage {
		margin-top: 40px;
		border: 1px solid var(--line);
		border-radius: 12px;
		background:
			radial-gradient(ellipse 70% 60% at 50% 50%, rgba(247, 120, 186, 0.08), transparent 60%),
			var(--bg-elev);
		padding: 48px 24px;
		position: relative;
		overflow: hidden;
	}
	.stage::before {
		content: 'ROUND 03 · PROMPT';
		position: absolute;
		top: 16px;
		left: 20px;
		font-size: 10px;
		color: var(--ink-mute);
		letter-spacing: 0.16em;
	}
	.stage::after {
		content: '4 PLAYERS · WS CONNECTED';
		position: absolute;
		top: 16px;
		right: 20px;
		font-size: 10px;
		color: var(--accent-2);
		letter-spacing: 0.16em;
	}
	.stage-prompt {
		text-align: center;
		font-family: 'Instrument Serif', Georgia, serif;
		font-style: italic;
		font-size: 24px;
		color: var(--ink-dim);
		margin: 0 auto 40px;
		max-width: 560px;
		padding-top: 24px;
	}
	.stage-prompt :global(q) {
		color: var(--ink);
	}
	.card-row {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		gap: 16px;
		flex-wrap: wrap;
	}
	.pcard {
		width: 150px;
		height: 220px;
		border-radius: 12px;
		background: linear-gradient(180deg, var(--bg-elev-2), #0f1114);
		border: 1px solid var(--line-strong);
		padding: 16px 14px;
		display: flex;
		flex-direction: column;
		font-size: 11px;
		color: var(--ink-dim);
		line-height: 1.5;
		position: relative;
		transition: transform 0.3s;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
	}
	.pcard .top {
		font-size: 9px;
		letter-spacing: 0.14em;
		color: var(--ink-mute);
		display: flex;
		justify-content: space-between;
		margin-bottom: 14px;
	}
	.pcard .body {
		flex: 1;
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 15px;
		color: var(--ink);
		font-style: italic;
		line-height: 1.3;
	}
	.pcard .foot {
		font-size: 9px;
		color: var(--ink-mute);
		letter-spacing: 0.1em;
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		border-top: 1px dashed var(--line);
		padding-top: 8px;
	}
	.pcard.r1 { transform: rotate(-5deg) translateY(10px); }
	.pcard.r2 { transform: rotate(-1deg); }
	.pcard.r3 {
		transform: rotate(1deg) translateY(-20px) scale(1.06);
		border-color: var(--accent);
		box-shadow: 0 16px 48px rgba(247, 120, 186, 0.25);
		background: linear-gradient(180deg, #1a1217, #0f1114);
	}
	.pcard.r3 .top :global(.lbl) { color: var(--accent); }
	.pcard.r4 { transform: rotate(4deg) translateY(6px); }
	.pcard.r5 { transform: rotate(7deg) translateY(14px); }

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

	.ws-mock {
		border: 1px solid var(--line);
		border-radius: 10px;
		background: var(--bg-elev);
		overflow: hidden;
	}
	.ws-head {
		padding: 10px 16px;
		border-bottom: 1px solid var(--line);
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 11px;
		color: var(--ink-mute);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.ws-head .dots {
		display: flex;
		gap: 6px;
	}
	.ws-head .dots :global(span) {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--line-strong);
	}
	.ws-head .live {
		margin-left: auto;
		color: var(--accent-2);
		letter-spacing: 0.14em;
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.ws-head .live::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent-2);
		box-shadow: 0 0 8px var(--accent-2);
	}

	.ws-body {
		padding: 20px 22px;
		font-size: 12px;
		line-height: 1.9;
	}
	.msg {
		display: grid;
		grid-template-columns: 80px 90px 1fr;
		gap: 12px;
		padding: 3px 0;
	}
	.msg .t {
		color: var(--ink-mute);
		font-variant-numeric: tabular-nums;
	}
	.msg .dir {
		color: var(--ink-faint);
		letter-spacing: 0.1em;
		font-size: 10px;
		padding-top: 3px;
	}
	.msg .dir.in { color: var(--accent-2); }
	.msg .dir.out { color: var(--accent); }
	.msg .dir.sys { color: var(--yellow); }
	.msg .c {
		color: var(--ink);
	}
	.msg .c :global(.k) { color: var(--blue); }
	.msg .c :global(.s) { color: var(--accent-2); }
	.msg .c :global(.n) { color: #d2a8ff; }
	.msg .c :global(.m) { color: var(--ink-mute); }

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
		.pcard {
			width: 120px;
			height: 180px;
		}
	}
</style>
