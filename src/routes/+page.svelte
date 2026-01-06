<script lang="ts">
	import { Mail, Github, Linkedin, ExternalLink } from 'lucide-svelte';
	import Button from '$lib/components/ui/button.svelte';
</script>

<div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
	<div class="w-full max-w-4xl">
		<!-- Hero Section -->
		<section class="relative">
			<!-- Decorative gradient background -->
			<div
				class="absolute -inset-4 sm:-inset-8 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl blur-3xl opacity-50"
			></div>

			<div class="relative space-y-6 sm:space-y-8 md:space-y-12">
				<!-- Name with unique styling -->
				<div class="space-y-2 sm:space-y-3">
					<h1
						class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none"
					>
						<span
							class="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent block"
						>
							Matthew
						</span>
						<span
							class="bg-gradient-to-r from-accent via-primary to-foreground bg-clip-text text-transparent block mt-1 sm:mt-2"
						>
							Troke
						</span>
					</h1>
				</div>

				<!-- Title and Role -->
				<div class="space-y-2 sm:space-y-3 max-w-2xl">
					<h2
						class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground"
					>
						Full-stack Software Engineer
					</h2>
					<p
						class="text-base sm:text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-xl"
					>
						Building elegant solutions with clean code and thoughtful design.
					</p>
				</div>

				<!-- Contact Links -->
				<div
					class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4"
				>
					<Button
						href="mailto:trokematthew@gmail.com"
						variant="outline"
						size="lg"
						class="group border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all w-full sm:w-auto justify-center sm:justify-start"
					>
						<Mail
							class="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform flex-shrink-0"
						/>
						<span>Email</span>
					</Button>

					<Button
						href="https://github.com/MatthewTroke"
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						size="lg"
						class="group border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all w-full sm:w-auto justify-center sm:justify-start"
					>
						<Github
							class="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform flex-shrink-0"
						/>
						<span>GitHub</span>
					</Button>

					<Button
						href="https://www.linkedin.com/in/matthewtroke/"
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						size="lg"
						class="group border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all w-full sm:w-auto justify-center sm:justify-start"
					>
						<Linkedin
							class="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform flex-shrink-0"
						/>
						<span>LinkedIn</span>
					</Button>
				</div>

				<!-- Decorative line with unique styling -->
				<div class="pt-6 sm:pt-8">
					<div
						class="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
					></div>
					<div
						class="h-px w-1/3 mt-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
					></div>
				</div>
			</div>
		</section>

		<!-- Qualifications Section -->
		<section class="mt-20 sm:mt-24 md:mt-32">
			<div class="space-y-12 sm:space-y-16 md:space-y-20">
				<!-- Section Title -->
				<h2
					class="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8 sm:mb-12"
				>
					Experience
				</h2>

				<!-- Timeline Container -->
				<div class="relative">
					<!-- Timeline Line -->
					<div
						class="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent hidden sm:block"
					></div>

					<!-- Timeline Entries -->
					<div class="space-y-10 sm:space-y-14 md:space-y-18">
						<!-- Neural Decks Entry -->
						<div class="relative pl-10 sm:pl-16 md:pl-20">
							<!-- Timeline Dot -->
							<div
								class="absolute left-0 sm:left-4 md:left-6 top-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-primary border-2 sm:border-4 border-background shadow-lg shadow-primary/20"
							></div>

							<div class="space-y-4 sm:space-y-5">
								<!-- Company and Role -->
								<div class="space-y-1 sm:space-y-2">
									<h3
										class="text-xl sm:text-2xl md:text-3xl font-bold text-foreground"
									>
										<a
											href="https://neuraldecks.app"
											target="_blank"
											rel="noopener noreferrer"
											class="hover:text-primary transition-colors inline-flex items-center gap-2 group"
										>
											<span>Neural Decks</span>
											<ExternalLink
												class="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all"
											/>
										</a>
									</h3>
									<p class="text-base sm:text-lg text-muted-foreground">
										Software Engineer, Founder
									</p>
									<p class="text-sm sm:text-base text-muted-foreground/70">
										July 2025 - Present
									</p>
								</div>

								<!-- Description -->
								<p class="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-3xl">
									Passion project. Real-time web application card game where users can create and share their own decks, and play with others in real-time multiplayer games. Uses artificial intelligence to generate
									unique decks to play real-time card games using websockets. Completely custom design and development.
									Integration with Stripe for processing premium currency.
								</p>

								<!-- Technologies -->
								<div class="pt-2">
									<p
										class="text-xs sm:text-sm text-muted-foreground/60 mb-3 sm:mb-4 uppercase tracking-wide"
									>
										Technologies
									</p>
									<div
										class="flex flex-wrap gap-2 sm:gap-3 items-center"
									>
										<a
											href="https://go.dev"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/go/00ADD8"
												alt="Go"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>Golang</span>
										</a>
										<a
											href="https://svelte.dev"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/svelte/FF3E00"
												alt="Svelte"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>SvelteKit</span>
										</a>
										<a
											href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/socketdotio/010101"
												alt="WebSockets"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>WebSockets</span>
										</a>
										<a
											href="https://stripe.com"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/stripe/635BFF"
												alt="Stripe"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>Stripe</span>
										</a>
										<a
											href="https://nginx.org"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/nginx/009639"
												alt="Nginx"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>Nginx</span>
										</a>
										<a
											href="https://www.docker.com"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/docker/2496ED"
												alt="Docker"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>Docker</span>
										</a>
										<a
											href="https://www.postgresql.org"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/postgresql/4169E1"
												alt="PostgreSQL"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>PostgreSQL</span>
										</a>
									</div>
								</div>
							</div>
						</div>

						<!-- Square Entry -->
						<div class="relative pl-10 sm:pl-16 md:pl-20">
							<!-- Timeline Dot -->
							<div
								class="absolute left-0 sm:left-4 md:left-6 top-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-primary border-2 sm:border-4 border-background shadow-lg shadow-primary/20"
							></div>

							<div class="space-y-4 sm:space-y-5">
								<!-- Company and Role -->
								<div class="space-y-1 sm:space-y-2">
									<h3
										class="text-xl sm:text-2xl md:text-3xl font-bold text-foreground"
									>
										<a
											href="https://squareup.com"
											target="_blank"
											rel="noopener noreferrer"
											class="hover:text-primary transition-colors inline-flex items-center gap-2 group"
										>
											<span>Square</span>
											<ExternalLink
												class="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all"
											/>
										</a>
									</h3>
									<p class="text-base sm:text-lg text-muted-foreground">
										Software Engineer
									</p>
									<p class="text-sm sm:text-base text-muted-foreground/70">
										San Francisco, CA — July 2020 - July 2023 (3 years)
									</p>
								</div>

								<!-- Bullet Points -->
								<ul
									class="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-muted-foreground/80 leading-relaxed list-disc list-outside ml-4 sm:ml-6 max-w-3xl"
								>
									<li>
										Built integration wizard flows for 3rd party channels within the Square
										dashboard platform to enable Square customers to easily advertise their
										Square catalog across 3rd party platforms such as Google, TikTok, and Meta.
									</li>
									<li>
										Worked very closely with product and design teams to arrive at elegant
										solutions to complex problems.
									</li>
									<li>
										Contributed to many of the foundational features in the frontend for my
										teams' product (local dev, testing, mocking, etc.)
									</li>
									<li>
										Became interview certified at Square and helped interview potential
										candidates joining Square on the frontend team
									</li>
									<li>Used Jira/Scrum project management tools and processes</li>
									<li>Github and git flow for version control</li>
								</ul>

								<!-- Technologies -->
								<div class="pt-2">
									<p
										class="text-xs sm:text-sm text-muted-foreground/60 mb-3 sm:mb-4 uppercase tracking-wide"
									>
										Technologies
									</p>
									<div
										class="flex flex-wrap gap-2 sm:gap-3 items-center"
									>
										<a
											href="https://react.dev"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/react/61DAFB"
												alt="React"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>React</span>
										</a>
										<a
											href="https://www.typescriptlang.org"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/typescript/3178C6"
												alt="TypeScript"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>TypeScript</span>
										</a>
										<a
											href="https://emberjs.com"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/emberdotjs/E04E39"
												alt="EmberJS"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>EmberJS</span>
										</a>
										<a
											href="https://go.dev"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/go/00ADD8"
												alt="Go"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>Golang</span>
										</a>
									</div>
								</div>
							</div>
						</div>

						<!-- Stitch Labs Entry -->
						<div class="relative pl-10 sm:pl-16 md:pl-20">
							<!-- Timeline Dot -->
							<div
								class="absolute left-0 sm:left-4 md:left-6 top-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-primary border-2 sm:border-4 border-background shadow-lg shadow-primary/20"
							></div>

							<div class="space-y-4 sm:space-y-5">
								<!-- Company and Role -->
								<div class="space-y-1 sm:space-y-2">
									<h3
										class="text-xl sm:text-2xl md:text-3xl font-bold text-foreground"
									>
										<a
											href="https://squareup.com/us/en/press/stitchlabs-welcome"
											target="_blank"
											rel="noopener noreferrer"
											class="hover:text-primary transition-colors inline-flex items-center gap-2 group"
										>
											<span>Stitch Labs</span>
											<ExternalLink
												class="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all"
											/>
										</a>
									</h3>
									<p class="text-base sm:text-lg text-muted-foreground">
										Software Engineer
									</p>
									<p class="text-sm sm:text-base text-muted-foreground/70">
										San Francisco, CA — October 2018 - July 2020 (2 years)
									</p>
								</div>

								<!-- Bullet Points -->
								<ul
									class="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-muted-foreground/80 leading-relaxed list-disc list-outside ml-4 sm:ml-6 max-w-3xl"
								>
									<li>
										Built product features for front-end in AngularJS for complex inventory
										management systems and applications
									</li>
									<li>
										Worked closely with product & design implementing product features
									</li>
									<li>Used Jira/Scrum project management tools and processes</li>
									<li>Github and git flow for version control</li>
									<li>
										Independently built a front-end dashboard for a complex authentication
										gateway using React/Redux to enable third-party logistic companies to have
										scoped access to internal API endpoints via OAuth
									</li>
								</ul>

								<!-- Technologies -->
								<div class="pt-2">
									<p
										class="text-xs sm:text-sm text-muted-foreground/60 mb-3 sm:mb-4 uppercase tracking-wide"
									>
										Technologies
									</p>
									<div
										class="flex flex-wrap gap-2 sm:gap-3 items-center"
									>
										<a
											href="https://react.dev"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/react/61DAFB"
												alt="React"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>React</span>
										</a>
										<a
											href="https://angular.io"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/angular/DD0031"
												alt="Angular"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>Angular</span>
										</a>
										<a
											href="https://www.php.net"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/php/777BB4"
												alt="PHP"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>PHP</span>
										</a>
										<a
											href="https://laravel.com"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/laravel/FF2D20"
												alt="Laravel"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>Laravel</span>
										</a>
										<a
											href="https://www.mysql.com"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/mysql/4479A1"
												alt="SQL"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>SQL</span>
										</a>
										<a
											href="https://www.atlassian.com/software/jira"
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md bg-muted/50 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/50 transition-all text-xs sm:text-sm text-muted-foreground hover:text-primary"
										>
											<img
												src="https://cdn.simpleicons.org/jira/0052CC"
												alt="Jira"
												class="w-3.5 h-3.5 sm:w-4 sm:h-4"
											/>
											<span>Jira</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
