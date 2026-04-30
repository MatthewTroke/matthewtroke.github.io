<script lang="ts">
	import { onMount } from 'svelte';

	type Command = {
		group: string;
		icon: string;
		label: string;
		hint: string;
		action: () => void;
	};

	let cmdkOpen = $state(false);
	let query = $state('');
	let activeIndex = $state(0);
	let inputEl: HTMLInputElement | null = $state(null);
	let localTime = $state('—');
	let submitting = $state(false);
	let submitted = $state(false);
	let submitError = $state('');

	function scrollToId(id: string) {
		closeCmdk();
		const el = document.getElementById(id);
		if (el) {
			window.scrollTo({
				top: el.getBoundingClientRect().top + window.scrollY - 60,
				behavior: 'smooth'
			});
		}
	}

	const commands: Command[] = [
		{ group: 'Navigate', icon: '§', label: 'Jump to Work', hint: 'g w', action: () => scrollToId('work') },
		{ group: 'Navigate', icon: '§', label: 'Jump to Projects', hint: 'g p', action: () => scrollToId('projects') },
		{ group: 'Navigate', icon: '§', label: 'Jump to Now', hint: 'g n', action: () => scrollToId('now') },
		{ group: 'Navigate', icon: '§', label: 'Jump to Contact', hint: 'g c', action: () => scrollToId('contact') },
		{ group: 'Projects', icon: '◆', label: 'Open — Statik Form', hint: 'case study', action: () => (location.href = '/projects/statik-form') },
		{ group: 'External', icon: '↗', label: 'GitHub — @MatthewTroke', hint: 'github.com', action: () => window.open('https://github.com/MatthewTroke', '_blank') },
		{ group: 'External', icon: '↗', label: 'LinkedIn — /matthewtroke', hint: 'linkedin', action: () => window.open('https://linkedin.com/in/matthewtroke', '_blank') },
		{ group: 'External', icon: '↗', label: 'Statik Form', hint: 'statikform.com', action: () => window.open('https://statikform.com', '_blank') },
		{
			group: 'Actions',
			icon: '↓',
			label: 'Download résumé (PDF)',
			hint: '—',
			action: () => {
				const a = document.createElement('a');
				a.href = '/MATTHEW-TROKE-RESUME.pdf';
				a.download = 'Matthew-Troke-Resume.pdf';
				a.click();
			}
		},
		{ group: 'Actions', icon: '✉', label: 'Email — trokematthew@gmail.com', hint: 'mailto', action: () => (location.href = 'mailto:trokematthew@gmail.com') },
		{ group: 'Actions', icon: '⎘', label: 'Copy email address', hint: 'clipboard', action: () => navigator.clipboard.writeText('trokematthew@gmail.com') }
	];

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return commands;
		return commands.filter((c) => (c.label + ' ' + c.group + ' ' + (c.hint || '')).toLowerCase().includes(q));
	});

	function openCmdk() {
		cmdkOpen = true;
		query = '';
		activeIndex = 0;
		setTimeout(() => inputEl?.focus(), 30);
	}
	function closeCmdk() {
		cmdkOpen = false;
	}
	function runActive() {
		const c = filtered[activeIndex];
		if (c) c.action();
	}

	const RECAPTCHA_SITE_KEY = '6LdrwsQsAAAAAOuDfGy3napm2YnvDL7dsUEWjreV';
	const FORM_ENDPOINT = 'https://statikform.com/api/f/d886a2bd5947e64d';

	type Grecaptcha = {
		ready: (cb: () => void) => void;
		execute: (siteKey: string, opts: { action: string }) => Promise<string>;
	};

	function getRecaptchaToken(): Promise<string> {
		return new Promise((resolve, reject) => {
			const g = (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha;
			if (!g) {
				reject(new Error('reCAPTCHA not loaded'));
				return;
			}
			g.ready(() => {
				g.execute(RECAPTCHA_SITE_KEY, { action: 'submit' }).then(resolve, reject);
			});
		});
	}

	async function sendForm() {
		const form = document.getElementById('contact-form') as HTMLFormElement | null;
		if (!form) return;
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}
		submitting = true;
		submitError = '';
		try {
			const token = await getRecaptchaToken();
			const data = new FormData(form);
			const payload: Record<string, string> = { 'g-recaptcha-response': token };
			data.forEach((value, key) => {
				payload[key] = typeof value === 'string' ? value : '';
			});
			const res = await fetch(FORM_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			if (!res.ok) throw new Error(`Request failed (${res.status})`);
			submitted = true;
		} catch (err) {
			submitError = err instanceof Error ? err.message : 'Unable to send message';
		} finally {
			submitting = false;
		}
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			activeIndex = Math.max(activeIndex - 1, 0);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			runActive();
		} else if (e.key === 'Escape') {
			closeCmdk();
		}
	}

	onMount(() => {
		const tick = () => {
			const fmt = new Intl.DateTimeFormat('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
				timeZone: 'America/Los_Angeles'
			});
			localTime = fmt.format(new Date());
		};
		tick();
		const interval = setInterval(tick, 1000);

		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				if (cmdkOpen) closeCmdk();
				else openCmdk();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => {
			clearInterval(interval);
			window.removeEventListener('keydown', onKey);
		};
	});

	const groupedFiltered = $derived.by(() => {
		const result: { group: string; items: (Command & { index: number })[] }[] = [];
		let last: string | null = null;
		filtered.forEach((c, i) => {
			if (c.group !== last) {
				result.push({ group: c.group, items: [] });
				last = c.group;
			}
			result[result.length - 1].items.push({ ...c, index: i });
		});
		return result;
	});
</script>

<svelte:head>
	<title>Matthew Troke — Full-stack Software Engineer</title>
</svelte:head>

<div class="topbar">
	<div class="topbar-inner">
		<div class="brand">
			<span class="dot"></span>
			<span>matthew<span style="color:var(--ink-mute)">.</span>troke</span>
			<span style="color:var(--ink-faint); margin-left:8px;">~/portfolio</span>
		</div>
		<nav>
			<a href="#work"><span class="n">01</span>work</a>
			<a href="#projects"><span class="n">02</span>projects</a>
			<a href="#now"><span class="n">03</span>now</a>
			<a href="#contact"><span class="n">04</span>contact</a>
		</nav>
		<div style="display:flex; align-items:center; gap:10px; color:var(--ink-mute); font-size:11px;">
			<span>press</span>
			<span class="kbd">⌘ K</span>
		</div>
	</div>
</div>

<main>
	<section class="hero">
		<div class="container">
			<div class="hero-grid">
				<div class="hero-label">
					<b>↳</b> INDEX<br />
					<span style="color:var(--ink-faint)">№ 001</span>
				</div>

				<div>
					<h1>
						<span class="prompt">➜</span>
						<span style="color:var(--blue)">~</span>
						<span style="color:var(--ink-mute)"> cat</span>
						<span style="color:var(--yellow)"> about.txt</span>
						<span class="cursor"></span>
					</h1>

					<h2 class="hero-headline">
						Full-stack<br />
						engineer <span class="i">building</span><br />
						at the edges<span style="color:var(--accent)">:</span>
					</h2>

					<p class="hero-sub">
						Decade of shipping product at the intersection of engineering and design — at both
						startups and some of the largest tech companies in the bay area.
						<strong>Stitch Labs</strong>
						<span style="color:var(--ink-faint)">→</span>
						<strong>Square</strong>.
					</p>

					<div class="hero-cta">
						<button class="btn primary" onclick={openCmdk}>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
								<circle cx="11" cy="11" r="7" />
								<path d="M21 21l-4.3-4.3" />
							</svg>
							Explore
							<span class="kbd" style="background:rgba(0,0,0,0.15); border-color:rgba(0,0,0,0.2); color:rgba(0,0,0,0.55);">⌘K</span>
						</button>
						<a href="/MATTHEW-TROKE-RESUME.pdf" class="btn" download>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
							</svg>
							Résumé.pdf
						</a>
						<a href="mailto:trokematthew@gmail.com" class="btn">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="3" y="5" width="18" height="14" rx="2" />
								<path d="M3 7l9 6 9-6" />
							</svg>
							Get in touch
						</a>
					</div>
				</div>

				<aside id="now" class="now-card">
					<div class="now-head">
						<span>// now</span>
						<span class="live">LIVE</span>
					</div>
					<div class="now-body">
						<div class="line">
							<div class="k">role</div>
							<div class="v"><b>Fullstack Freelancer</b></div>
						</div>
						<div class="line">
							<div class="k">status</div>
							<div class="v">Available for select work</div>
						</div>
						<div class="line">
							<div class="k">location</div>
							<div class="v">Southern California — Remote</div>
						</div>
						<div class="line">
							<div class="k">local</div>
							<div class="v" style="font-variant-numeric: tabular-nums;">{localTime} PST</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</section>

	<section id="work" class="sec-pad">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>01</b> / Work</div>
				<h2 class="sec-title">
					Professional experience.<em>A decade of product engineering.</em>
				</h2>
			</div>

			<div>
				<article class="role">
					<div class="role-when">
						<b>Jul 2020 — Jul 2023</b>
						3 years · San Francisco, CA
					</div>
					<div>
						<h3>
							<a href="https://squareup.com" target="_blank" rel="noopener">
								Square <span class="arr">↗</span>
							</a>
						</h3>
						<div class="role-meta"><span>Software Engineer</span><span>Merchant surfaces</span></div>
						<ul>
							<li>Built integration wizard flows inside the Square Dashboard — enabling merchants to advertise their catalog across Google, TikTok, and Meta.</li>
							<li>Partnered closely with product and design on high-stakes merchant surfaces.</li>
							<li>Authored foundational frontend infrastructure (local dev, testing, mocking).</li>
							<li>Interview-certified: helped hire frontend engineers across levels.</li>
						</ul>
						<div class="stack">
							<span>React</span><span>TypeScript</span><span>EmberJS</span><span>Golang</span><span>Docker</span>
						</div>
					</div>
				</article>

				<article class="role">
					<div class="role-when">
						<b>Oct 2018 — Jul 2020</b>
						2 years · San Francisco, CA
						<div style="margin-top:8px; font-size:10px; color:var(--ink-mute); letter-spacing:0.06em;">
							Acquired by Square
						</div>
					</div>
					<div>
						<h3>
							<a href="https://squareup.com/us/en/press/stitchlabs-welcome" target="_blank" rel="noopener">
								Stitch Labs <span class="arr">↗</span>
							</a>
						</h3>
						<div class="role-meta"><span>Software Engineer</span><span>Enterprise inventory platform</span></div>
						<ul>
							<li>Shipped frontend features in AngularJS for a complex, enterprise-grade inventory management platform.</li>
							<li>Independently built a React/Redux OAuth dashboard giving 3rd-party logistics providers scoped access to internal APIs.</li>
						</ul>
						<div class="stack">
							<span>React</span><span>Angular</span><span>PHP</span><span>Laravel</span><span>SQL</span><span>Docker</span>
						</div>
					</div>
				</article>
			</div>
		</div>
	</section>

	<section id="projects" class="sec-pad">
		<div class="container">
			<div class="sec-head">
				<div class="sec-num">§ <b>02</b> / Solo</div>
				<h2 class="sec-title">
					Personal projects.<em>Owned end-to-end from DB to DNS.</em>
				</h2>
			</div>

			<div class="projects">
				<div></div>
				<div class="proj-grid">
					<a class="proj" href="/projects/statik-form">
						<div class="proj-visual visual-statik">
							<img src="/statikform/01_hero.png" alt="Statik Form homepage hero" loading="lazy" />
						</div>
						<div class="proj-body">
							<div class="proj-label"><span>2026 — Present</span><span class="tag">FOUNDER</span></div>
							<h4>Statik Form</h4>
							<p>
								Form backend for static sites, running entirely on the Cloudflare edge stack. Workers,
								Workflows, D1, KV — built and deployed solo with AI spam filtering that keeps submissions
								clean without CAPTCHAs.
							</p>
							<div class="proj-foot">
								<span>SvelteKit · Cloudflare · AI</span>
								<span class="arr">View case study ↗</span>
							</div>
						</div>
					</a>

				</div>
			</div>
		</div>
	</section>

	<section id="contact" class="contact">
		<div class="container">
			<div class="contact-grid">
				<div class="sec-num">§ <b>03</b> / Contact</div>
				<div>
					<h2>Available for<br /><span class="i">select work.</span></h2>
					<p>
						Currently freelancing and shipping Statik Form. Open to conversations about full-stack
						contract work, technical founding roles, and interesting product engineering problems.
					</p>

					{#if submitted}
						<div class="contact-success" role="status" aria-live="polite">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20 6 9 17l-5-5" />
							</svg>
							<div>
								<strong>Message received.</strong>
								<p>Thanks for reaching out — I&apos;ll get back to you shortly.</p>
							</div>
						</div>
					{:else}
						<form
							id="contact-form"
							class="contact-form"
							onsubmit={(e) => {
								e.preventDefault();
								void sendForm();
							}}
						>
							<div class="field">
								<label for="contact-email">
									<span class="lk">// email</span>
									<span class="req">required</span>
								</label>
								<input
									id="contact-email"
									type="email"
									name="email"
									placeholder="you@example.com"
									required
								/>
							</div>

							<div class="field">
								<label for="contact-message">
									<span class="lk">// what's on your mind?</span>
									<span class="req">required</span>
								</label>
								<textarea
									id="contact-message"
									name="textarea"
									placeholder="Write here…"
									rows="5"
									required
								></textarea>
							</div>

							<div class="field submit-row">
								<button
									type="submit"
									class="btn primary"
									class:is-submitting={submitting}
									disabled={submitting}
									onclick={(e) => {
										e.preventDefault();
										void sendForm();
									}}
								>
									{#if submitting}
										<svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
											<path d="M12 3a9 9 0 1 1-9 9" />
										</svg>
										Sending…
									{:else}
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M5 12h14M13 6l6 6-6 6" />
										</svg>
										Send message
									{/if}
								</button>
								<span class="hint">protected by reCAPTCHA · no spam, ever</span>
							</div>
							{#if submitError}
								<p class="submit-error" role="alert">{submitError}. Please try again.</p>
							{/if}
						</form>
					{/if}

					<div class="contact-links">
						<a href="mailto:trokematthew@gmail.com">
							<div>
								<span class="k">Email</span>
								<span class="v">trokematthew@gmail.com</span>
							</div>
							<span class="arr">↗</span>
						</a>
						<a href="https://github.com/MatthewTroke" target="_blank" rel="noopener">
							<div>
								<span class="k">GitHub</span>
								<span class="v">@MatthewTroke</span>
							</div>
							<span class="arr">↗</span>
						</a>
						<a href="https://linkedin.com/in/matthewtroke" target="_blank" rel="noopener">
							<div>
								<span class="k">LinkedIn</span>
								<span class="v">/in/matthewtroke</span>
							</div>
							<span class="arr">↗</span>
						</a>
						<a href="/MATTHEW-TROKE-RESUME.pdf" download>
							<div>
								<span class="k">Résumé</span>
								<span class="v">Download PDF</span>
							</div>
							<span class="arr">↓</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="inner">
		<div>© 2026 Matthew Troke · Built from scratch · Hosted on the edge</div>
		<div class="time">
			<span>all systems operational</span>
			<span style="color:var(--ink-faint); margin: 0 10px;">·</span>
			<span>local · <b>{localTime}</b></span>
		</div>
	</div>
</footer>

{#if cmdkOpen}
	<div
		class="cmdk-backdrop open"
		onclick={(e) => { if (e.target === e.currentTarget) closeCmdk(); }}
		role="button"
		tabindex="-1"
		onkeydown={(e) => { if (e.key === 'Escape') closeCmdk(); }}
	>
		<div class="cmdk" role="dialog" aria-label="Command palette">
			<input
				bind:this={inputEl}
				bind:value={query}
				oninput={() => (activeIndex = 0)}
				onkeydown={handleKey}
				placeholder="Type a command or search…"
				autocomplete="off"
				spellcheck="false"
			/>
			<div class="cmdk-list">
				{#if filtered.length === 0}
					<div style="padding: 30px 16px; text-align:center; color:var(--ink-mute); font-size:13px;">
						No matches for "{query}"
					</div>
				{:else}
					{#each groupedFiltered as grp (grp.group)}
						<div class="cmdk-group">{grp.group}</div>
						{#each grp.items as item (item.label)}
							<div
								class="cmdk-item"
								class:active={item.index === activeIndex}
								onmouseenter={() => (activeIndex = item.index)}
								onclick={() => item.action()}
								role="button"
								tabindex="-1"
								onkeydown={(e) => { if (e.key === 'Enter') item.action(); }}
							>
								<span class="lbl"><span class="ic">{item.icon}</span>{item.label}</span>
								<span class="hint">{item.hint || ''}</span>
							</div>
						{/each}
					{/each}
				{/if}
			</div>
			<div class="cmdk-foot">
				<span><span class="k">↑↓</span>navigate</span>
				<span><span class="k">↵</span>select</span>
				<span><span class="k">esc</span>close</span>
				<span style="margin-left:auto; color:var(--ink-faint);">matthew.troke/cmdk</span>
			</div>
		</div>
	</div>
{/if}

<style>
	a {
		color: inherit;
		text-decoration: none;
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
		max-width: 1280px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 32px;
		font-size: 12px;
	}
	.topbar .brand {
		display: flex;
		align-items: center;
		gap: 10px;
		font-weight: 600;
		letter-spacing: 0.02em;
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 0 0 rgba(126, 231, 135, 0.5);
		animation: pulse 2.4s ease-out infinite;
	}
	@keyframes pulse {
		0% { box-shadow: 0 0 0 0 rgba(126, 231, 135, 0.6); }
		70% { box-shadow: 0 0 0 8px rgba(126, 231, 135, 0); }
		100% { box-shadow: 0 0 0 0 rgba(126, 231, 135, 0); }
	}
	.topbar nav {
		display: flex;
		gap: 22px;
		color: var(--ink-dim);
	}
	.topbar nav a {
		transition: color 0.15s;
	}
	.topbar nav a:hover { color: var(--ink); }
	.topbar nav a :global(.n) {
		color: var(--ink-faint);
		margin-right: 6px;
	}

	.kbd {
		font-family: inherit;
		font-size: 11px;
		padding: 3px 7px;
		border: 1px solid var(--line-strong);
		border-bottom-width: 2px;
		border-radius: 5px;
		color: var(--ink-dim);
		background: var(--bg-elev);
	}

	.container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 32px;
	}

	section {
		border-bottom: 1px solid var(--line);
	}
	.sec-pad {
		padding: 88px 0;
	}

	.sec-head {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
		align-items: baseline;
		margin-bottom: 40px;
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
	.sec-title {
		font-family: 'Instrument Serif', Georgia, serif;
		font-style: italic;
		font-weight: 400;
		font-size: 42px;
		line-height: 1.05;
		letter-spacing: -0.01em;
		color: var(--ink);
		margin: 0;
	}
	.sec-title :global(em) {
		font-style: normal;
		color: var(--ink-dim);
		font-family: 'JetBrains Mono', monospace;
		font-size: 14px;
		font-weight: 400;
		display: block;
		margin-top: 12px;
		letter-spacing: 0;
	}

	.hero {
		padding: 80px 0 72px;
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 120px 1fr 280px;
		gap: 32px;
		align-items: start;
	}

	.hero-label {
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-mute);
		border-top: 1px solid var(--line-strong);
		padding-top: 8px;
	}
	.hero-label :global(b) {
		color: var(--accent);
		font-weight: 500;
	}

	.hero h1 {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 400;
		font-size: 13px;
		color: var(--ink-dim);
		margin: 0 0 24px;
		line-height: 1.6;
	}
	.hero h1 .prompt {
		color: var(--accent);
		margin-right: 8px;
	}
	.hero h1 .cursor {
		display: inline-block;
		width: 8px;
		height: 16px;
		background: var(--accent);
		vertical-align: -2px;
		margin-left: 4px;
		animation: blink 1.1s step-end infinite;
	}
	@keyframes blink {
		50% { opacity: 0; }
	}

	.hero-headline {
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-size: 88px;
		line-height: 0.94;
		letter-spacing: -0.03em;
		color: var(--ink);
		margin: 0 0 36px;
		max-width: 900px;
	}
	.hero-headline :global(.i) {
		font-style: italic;
		color: var(--accent);
	}

	.hero-sub {
		max-width: 620px;
		color: var(--ink-dim);
		font-size: 14px;
		line-height: 1.75;
	}
	.hero-sub :global(strong) {
		color: var(--ink);
		font-weight: 500;
	}

	.hero-cta {
		margin-top: 32px;
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		padding: 10px 16px;
		border: 1px solid var(--line-strong);
		background: transparent;
		color: var(--ink);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.15s;
		display: inline-flex;
		align-items: center;
		gap: 10px;
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
	.btn :global(svg) {
		width: 14px;
		height: 14px;
	}
	.btn[disabled] {
		cursor: not-allowed;
		opacity: 0.75;
	}
	.btn.is-submitting:hover {
		background: var(--accent);
		color: #0a0b0d;
		border-color: var(--accent);
	}
	.btn :global(svg.spinner) {
		animation: spin 0.7s linear infinite;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.now-card {
		border: 1px solid var(--line);
		border-radius: 8px;
		background:
			linear-gradient(180deg, rgba(126, 231, 135, 0.03), transparent 60%),
			var(--bg-elev);
		padding: 20px;
		position: sticky;
		top: 72px;
	}
	.now-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 14px;
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-mute);
	}
	.now-head .live {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--accent);
	}
	.now-head .live::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent);
		animation: pulse 2.4s ease-out infinite;
	}
	.now-body {
		font-size: 13px;
		color: var(--ink-dim);
		line-height: 1.7;
	}
	.now-body .line {
		display: flex;
		gap: 10px;
		padding: 6px 0;
		border-bottom: 1px dashed var(--line);
	}
	.now-body .line:last-child {
		border-bottom: 0;
	}
	.now-body .k {
		color: var(--ink-mute);
		width: 64px;
		flex: none;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding-top: 2px;
	}
	.now-body .v {
		color: var(--ink);
		flex: 1;
	}
	.now-body .v :global(b) {
		color: var(--accent);
		font-weight: 500;
	}

	.role {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
		padding: 28px 0;
		border-top: 1px solid var(--line);
		align-items: start;
		transition: background 0.2s;
	}
	.role:hover {
		background: linear-gradient(90deg, transparent, rgba(126, 231, 135, 0.02), transparent);
	}
	.role-when {
		font-size: 11px;
		color: var(--ink-mute);
		letter-spacing: 0.08em;
		padding-top: 6px;
	}
	.role-when :global(b) {
		color: var(--ink);
		font-weight: 500;
		display: block;
		font-size: 13px;
		letter-spacing: 0;
	}
	.role-when .badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 8px;
		font-size: 10px;
		padding: 3px 8px;
		border-radius: 999px;
		background: rgba(126, 231, 135, 0.08);
		color: var(--accent);
		border: 1px solid rgba(126, 231, 135, 0.2);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.role-when .badge::before {
		content: '';
		width: 5px;
		height: 5px;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 6px var(--accent);
	}
	.role h3 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-style: italic;
		font-size: 34px;
		line-height: 1;
		margin: 0 0 4px;
		color: var(--ink);
		letter-spacing: -0.01em;
	}
	.role h3 a {
		display: inline-flex;
		align-items: baseline;
		gap: 12px;
	}
	.role h3 a:hover {
		color: var(--accent);
	}
	.role h3 :global(.arr) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 14px;
		color: var(--ink-faint);
		font-style: normal;
		transition:
			color 0.15s,
			transform 0.2s;
	}
	.role h3:hover :global(.arr) {
		color: var(--accent);
		transform: translate(2px, -2px);
	}
	.role .role-meta {
		color: var(--ink-dim);
		font-size: 12px;
		margin-bottom: 14px;
	}
	.role .role-meta :global(span + span::before) {
		content: '·';
		margin: 0 8px;
		color: var(--ink-faint);
	}
	.role ul {
		margin: 0;
		padding: 0;
		list-style: none;
		color: var(--ink-dim);
		font-size: 13px;
		line-height: 1.7;
	}
	.role ul li {
		padding: 4px 0 4px 20px;
		position: relative;
	}
	.role ul li::before {
		content: '›';
		color: var(--accent);
		position: absolute;
		left: 0;
		top: 4px;
		font-weight: 500;
	}
	.role .stack {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		margin-top: 14px;
	}
	.role .stack :global(span) {
		font-size: 10px;
		padding: 3px 8px;
		border: 1px solid var(--line-strong);
		border-radius: 4px;
		color: var(--ink-mute);
		letter-spacing: 0.06em;
	}

	.projects {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
	}
	.proj-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
	}
	.proj {
		display: block;
		border: 1px solid var(--line);
		border-radius: 10px;
		overflow: hidden;
		background: var(--bg-elev);
		transition:
			border-color 0.2s,
			transform 0.2s;
	}
	.proj:hover {
		border-color: var(--line-strong);
		transform: translateY(-2px);
	}
	.proj-visual {
		aspect-ratio: 16 / 9;
		position: relative;
		overflow: hidden;
		border-bottom: 1px solid var(--line);
		background: var(--bg-elev-2);
	}
	.proj-body {
		padding: 22px 24px;
	}
	.proj-label {
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink-mute);
		margin-bottom: 8px;
		display: flex;
		justify-content: space-between;
	}
	.proj-label :global(.tag) {
		color: var(--accent);
	}
	.proj h4 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-style: italic;
		font-size: 30px;
		line-height: 1;
		margin: 0 0 10px;
		letter-spacing: -0.01em;
	}
	.proj p {
		margin: 0;
		color: var(--ink-dim);
		font-size: 13px;
		line-height: 1.65;
	}
	.proj-foot {
		margin-top: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 11px;
		color: var(--ink-mute);
	}
	.proj-foot :global(.arr) {
		color: var(--ink);
		transition:
			color 0.15s,
			transform 0.2s;
	}
	.proj:hover .proj-foot :global(.arr) {
		color: var(--accent);
		transform: translate(3px, -3px);
	}

	.visual-statik {
		background: #0e1013;
	}
	.visual-statik :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		display: block;
	}

	.visual-decks {
		background:
			radial-gradient(circle at 70% 40%, rgba(247, 120, 186, 0.1), transparent 50%),
			linear-gradient(180deg, #0e1013, #0a0b0d);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 20px;
	}
	.visual-decks :global(.card) {
		width: 70px;
		height: 100px;
		border: 1px solid var(--line-strong);
		border-radius: 6px;
		background: var(--bg-elev);
		padding: 10px 8px;
		font-size: 8px;
		color: var(--ink-dim);
		display: flex;
		flex-direction: column;
		transition: transform 0.3s;
	}
	.visual-decks :global(.card.r1) { transform: rotate(-8deg) translateY(6px); }
	.visual-decks :global(.card.r2) { transform: rotate(-3deg); }
	.visual-decks :global(.card.r3) {
		transform: rotate(2deg) translateY(-4px);
		border-color: var(--pink);
		color: var(--pink);
	}
	.visual-decks :global(.card.r4) { transform: rotate(6deg) translateY(4px); }
	.visual-decks :global(.card .top) {
		font-weight: 600;
		font-size: 9px;
		margin-bottom: 4px;
		letter-spacing: 0.1em;
	}
	.visual-decks :global(.card .mid) {
		flex: 1;
		font-size: 8px;
		line-height: 1.4;
	}

	.contact {
		padding: 96px 0 80px;
		text-align: left;
		border-bottom: 0;
	}
	.contact-grid {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
		align-items: start;
	}
	.contact h2 {
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-size: 72px;
		line-height: 0.95;
		letter-spacing: -0.02em;
		margin: 0 0 28px;
	}
	.contact h2 :global(.i) {
		font-style: italic;
		color: var(--accent);
	}
	.contact p {
		color: var(--ink-dim);
		max-width: 560px;
		font-size: 14px;
		line-height: 1.75;
		margin: 0 0 32px;
	}
	.contact-form {
		max-width: 680px;
		margin: 0 0 40px;
		display: grid;
		gap: 20px;
	}
	.contact-form .field {
		display: grid;
		gap: 8px;
	}
	.contact-form label {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		font-size: 11px;
		letter-spacing: 0.08em;
		color: var(--ink-mute);
	}
	.contact-form label .lk {
		color: var(--accent);
		font-family: 'JetBrains Mono', monospace;
	}
	.contact-form label .req {
		color: var(--ink-faint);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.contact-form input,
	.contact-form textarea {
		width: 100%;
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		color: var(--ink);
		background: var(--bg-elev);
		border: 1px solid var(--line-strong);
		border-radius: 6px;
		padding: 12px 14px;
		line-height: 1.6;
		outline: none;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
		resize: vertical;
	}
	.contact-form input::placeholder,
	.contact-form textarea::placeholder {
		color: var(--ink-mute);
	}
	.contact-form input:focus,
	.contact-form textarea:focus {
		border-color: var(--accent);
		box-shadow: 0 0 0 3px rgba(126, 231, 135, 0.12);
	}
	.contact-form textarea {
		min-height: 120px;
		font-family: 'JetBrains Mono', monospace;
	}
	.contact-form .submit-row {
		flex-direction: row;
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}
	.contact-form .submit-row .hint {
		font-size: 11px;
		color: var(--ink-mute);
		letter-spacing: 0.06em;
	}
	.submit-error {
		font-size: 12px;
		color: #ff8a8a;
		margin: 4px 0 0;
	}
	.contact-success {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		padding: 18px 20px;
		border: 1px solid var(--accent);
		border-radius: 8px;
		background: linear-gradient(180deg, rgba(126, 231, 135, 0.08), transparent 80%);
	}
	.contact-success :global(svg) {
		width: 22px;
		height: 22px;
		color: var(--accent);
		flex-shrink: 0;
		margin-top: 2px;
	}
	.contact-success strong {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		color: var(--ink);
		letter-spacing: 0.02em;
	}
	.contact-success p {
		margin: 4px 0 0;
		font-size: 13px;
		color: var(--ink-mute);
	}

	.contact-links {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		max-width: 680px;
		border-top: 1px solid var(--line);
	}
	.contact-links a {
		padding: 18px 0;
		border-bottom: 1px solid var(--line);
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		transition:
			padding-left 0.2s,
			color 0.15s;
		font-size: 13px;
	}
	.contact-links a:nth-child(odd) {
		padding-right: 16px;
		border-right: 1px solid var(--line);
	}
	.contact-links a:nth-child(even) {
		padding-left: 16px;
	}
	.contact-links a:hover {
		color: var(--accent);
		padding-left: 8px;
	}
	.contact-links a:nth-child(even):hover {
		padding-left: 24px;
	}
	.contact-links :global(.k) {
		font-size: 10px;
		color: var(--ink-mute);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		display: block;
		margin-bottom: 4px;
	}
	.contact-links :global(.v) {
		color: var(--ink);
		font-weight: 500;
	}
	.contact-links :global(.arr) { color: var(--ink-faint); }

	footer {
		padding: 22px 0;
		border-top: 1px solid var(--line);
		font-size: 11px;
		color: var(--ink-mute);
	}
	footer .inner {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 32px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
	}
	footer .time {
		color: var(--ink-dim);
	}
	footer .time :global(b) {
		color: var(--accent);
		font-weight: 500;
	}

	.cmdk-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(6px);
		z-index: 100;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 15vh;
		animation: fadeIn 0.15s ease-out;
	}
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	.cmdk {
		width: 560px;
		max-width: calc(100vw - 48px);
		background: var(--bg-elev);
		border: 1px solid var(--line-strong);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
		animation: popIn 0.18s ease-out;
	}
	@keyframes popIn {
		from { transform: translateY(-8px); opacity: 0; }
		to { transform: translateY(0); opacity: 1; }
	}
	.cmdk input {
		width: 100%;
		background: transparent;
		border: 0;
		padding: 18px 20px;
		color: var(--ink);
		font-family: inherit;
		font-size: 14px;
		border-bottom: 1px solid var(--line);
		outline: none;
	}
	.cmdk input::placeholder { color: var(--ink-mute); }
	.cmdk-list {
		max-height: 360px;
		overflow: auto;
		padding: 6px;
	}
	.cmdk-group {
		font-size: 10px;
		color: var(--ink-mute);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		padding: 10px 14px 6px;
	}
	.cmdk-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 14px;
		border-radius: 6px;
		cursor: pointer;
		color: var(--ink-dim);
		font-size: 13px;
	}
	.cmdk-item .ic {
		margin-right: 10px;
		color: var(--ink-faint);
		font-size: 11px;
		width: 14px;
		text-align: center;
	}
	.cmdk-item .lbl {
		color: var(--ink);
		display: flex;
		align-items: center;
		flex: 1;
	}
	.cmdk-item .hint {
		color: var(--ink-mute);
		font-size: 11px;
	}
	.cmdk-item.active {
		background: var(--bg-elev-2);
	}
	.cmdk-item.active .ic { color: var(--accent); }
	.cmdk-foot {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 10px 16px;
		border-top: 1px solid var(--line);
		font-size: 11px;
		color: var(--ink-mute);
	}
	.cmdk-foot .k {
		padding: 2px 6px;
		border: 1px solid var(--line-strong);
		border-radius: 3px;
		background: var(--bg-elev-2);
		color: var(--ink-dim);
		margin-right: 6px;
		font-size: 10px;
	}

	@media (max-width: 960px) {
		.topbar nav { display: none; }
		.hero-grid { grid-template-columns: 1fr; }
		.hero-headline { font-size: 56px; }
		.sec-head,
		.role,
		.projects,
		.contact-grid {
			grid-template-columns: 1fr;
		}
		.sec-num,
		.hero-label,
		.role-when {
			border-top: 0;
			padding-top: 0;
		}
		.proj-grid { grid-template-columns: 1fr; }
		.container { padding: 0 20px; }
		.now-card { position: static; }
		.contact h2 { font-size: 44px; }
		.contact-links { grid-template-columns: 1fr; }
		.contact-links a:nth-child(odd) {
			border-right: 0;
			padding-right: 0;
		}
		.contact-links a:nth-child(even) { padding-left: 0; }
	}
</style>
