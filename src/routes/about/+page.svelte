<script lang="ts">
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import Portrait from './assets/portrait.jpg';
	import EnvelopeIcon from '$lib/components/icons/EnvelopeIcon.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import LinkedInIcon from '$lib/components/icons/LinkedInIcon.svelte';
	import TwitterIcon from '$lib/components/icons/TwitterIcon.svelte';
	import SocialLink from '$lib/components/SocialLink.svelte';
</script>

<PageMeta title="About | Vitaneri" description="About Vitaneri" route={$page.url.pathname} />

<section id="top" class="flex flex-col space-y-16 leading-6 text-subtle">
	<!-- About Me -->
	<section class="flex flex-col space-y-6">
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">About Me</h1>
		<div class="flex flex-col items-center justify-center space-y-2">
			<img
				class="h-44 w-44 rounded-full border border-accent"
				src={Portrait}
				alt="Vincent Taneri"
			/>
			<h3 class="text-2xl">Vincent Taneri</h3>
			<p class="text-sm text-subtle">Software Developer</p>
			<!-- Social links -->
			<div class="flex items-center space-x-4">
				<SocialLink href="mailto:tanerijun@vitaneri.com" title="Send me an email">
					<EnvelopeIcon size={22} />
				</SocialLink>
				<SocialLink href="https://github.com/tanerijun" title="See my Github profile">
					<GithubIcon size={22} />
				</SocialLink>
				<SocialLink href="https://twitter.com/tanerijun" title="Say hi on Twitter">
					<TwitterIcon size={22} />
				</SocialLink>
				<SocialLink href="https://www.linkedin.com/in/vincent-taneri/" title="Connect on LinkedIn">
					<LinkedInIcon size={22} />
				</SocialLink>
			</div>
		</div>
		<p>
			Hi, my name is Vincent. I'm currently a student at LongHua University of Science and
			Technology, Taiwan, pursuing a B.E in Electronic Engineering.
		</p>
		<p>
			From a very young age, I've always been interested in Tech and Science. Initially, I started
			coding out of curiosity, eventually it became a hobby, and then a passion.
		</p>
		<p>
			I work to the principle that simple is beautiful, while carefully including the finest details
			and interactions. I'm a naturally curious person who is a tad bit obsessed with perfection and
			is perpetually seeking to learn and improve.
		</p>
		<p>Another interesting fact about me: I speak Chinese, English, Indonesian, and Hokkien.</p>
	</section>

	<!-- Skills -->
	<section class="flex flex-col space-y-6">
		<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">My Skills</h2>
		<p>
			The tech field is always evolving, new techs come out all the time. I strive to keep myself up
			to date, having at least a high level understanding of the techs. These are the skills and
			techs I'm most confident with:
		</p>
		<div class="flex flex-col space-y-4">
			<h3 class="text-2xl">Languages</h3>
			<ul class="list-disc columns-2 pl-6 marker:text-accent">
				<li>JavaScript</li>
				<li>TypeScript</li>
				<li>Go</li>
				<li>Java</li>
				<li>Python</li>
			</ul>
			<h3 class="text-2xl">Frontend</h3>
			<ul class="list-disc columns-2 pl-6 marker:text-accent">
				<li>HTML / Semantic / a11y</li>
				<li>CSS / SCSS / Tailwind</li>
				<li>React</li>
				<li>React Native</li>
				<li>NextJS</li>
				<li>Remix</li>
				<li>Svelte</li>
				<li>Sveltekit</li>
				<li>Astro</li>
			</ul>
			<h3 class="text-2xl">Backend</h3>
			<ul class="list-disc columns-2 pl-6 marker:text-accent">
				<li>Node JS / Express / Fastify</li>
				<li>Spring / Spring Boot</li>
				<li>MongoDB</li>
				<li>MySQL</li>
				<li>PostgreSQL</li>
				<li>Firebase</li>
			</ul>
			<h3 class="text-2xl">Other</h3>
			<ul class="list-disc columns-2 pl-6 marker:text-accent">
				<li>Git</li>
				<li>Docker</li>
			</ul>
		</div>
	</section>

	<!-- Hobbies -->
	<section class="flex flex-col space-y-6">
		<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">Hobbies</h2>
		<p>
			Life couldn't be all about working or learning. Like everyone else, I've my hobbies that give
			me fuel and necessary re-charge to keep me motivated. Here are some activities that I enjoy
			doing:
		</p>
		<ul class="flex list-disc flex-col space-y-2 pl-6 marker:text-accent">
			<li>Tinkering electronics</li>
			<li>Reading (Non-fiction, Fiction, Manga)</li>
			<li>Watching movies (Mostly Anime)</li>
			<li>Playing video games</li>
			<li>Cycling, running, weight-lifting</li>
			<li>
				Hunting for great stories (I really love those movies or books with life-changing story 😊)
			</li>
		</ul>
	</section>

	<footer class="flex flex-col space-y-6">
		<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">Say Hi ~</h2>
		<p>
			Feel free to reach me through the social links <a
				href="#top"
				class="hover-underline-animation text-accent">above ↑</a
			> .
		</p>
	</footer>
</section>
