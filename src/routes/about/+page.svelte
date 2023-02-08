<script>
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import Portrait from './assets/portrait.jpg';
</script>

<PageMeta title="About | Vitaneri" description="About Vitaneri" route={$page.url.pathname} />

<section class="flex flex-col gap-8 leading-6 text-subtle">
	<section>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">About Me</h1>
		<div class="mt-6 text-justify">
			TODO THIS PART SHOULD BE BETTER

			<img
				class="float-right ml-6 mb-4 h-48 w-48 self-center rounded-3xl"
				src={Portrait}
				alt="Vincent Taneri"
			/>
			<p>
				Hi, my name is Vincent. I'm currently a student at LongHua University of Science and
				Technology, Taiwan, pursuing a B.E in Electronic Engineering.
			</p>
			<p class="mt-6">
				From a very young age, I've always been interested in Tech and Science. Initially, I started
				coding out of curiosity, eventually it became a hobby. Most of my times on the screen is
				spent coding and I finally decided to pursue a career in software development. I'm
				passionate about software development, I create software that don't just look good, but also
				functional and performant. I'm always eager to take on any challenge, and aim to excel in
				all the tasks I take on.
			</p>
		</div>
	</section>

	<section class="flex flex-col space-y-6">
		<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">My Skills</h2>
		<p>
			The tech field is always evolving, new techs come out all the time. I strive to keep myself up
			to date, having at least a high level understanding of the techs. These are the skills and
			techs I'm most confident with:
		</p>
		TODO skills table
	</section>

	<section class="flex flex-col space-y-6">
		<h2 class="text-4xl font-bold tracking-tight sm:text-5xl">Hobbies</h2>
		<p>
			Life couldn't be all about working or learning. Like everyone else, I've my hobbies that give
			me fuel and necessary re-charge to keep me motivated. Here are some activities that I enjoy
			doing:
		</p>
		<ul>
			<li>Tinkering electronics</li>
			<li>Reading (Non-fiction, Fiction, Manga)</li>
			<li>Watching movies (Mostly Anime)</li>
			<li>Playing video games</li>
			<li>Cycling, running, weight-lifting</li>
			<li>
				Hunting for great stories (I really love those movies or books with life-changing story ☺️)
			</li>
		</ul>
	</section>

	<footer>
		<p>Get to know more about me through the social links below ↓ .</p>
	</footer>
</section>
