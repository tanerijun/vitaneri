<script lang="ts">
	import Button from './Button.svelte';
	import EnvelopeIcon from './icons/EnvelopeIcon.svelte';
	import GithubIcon from './icons/GithubIcon.svelte';
	import LinkedInIcon from './icons/LinkedInIcon.svelte';
	import TwitterIcon from './icons/TwitterIcon.svelte';
</script>

<footer class="flex items-center justify-between py-4">
	<p>&#169; Copyright 2022-{new Date().getFullYear()} Vincent Taneri</p>

	<!-- Social links -->
	<div class="flex items-center space-x-2">
		<Button
			as="a"
			href="mailto:tanerivince@gmail.com"
			title="Send an email to tanerivince@gmail.com"
		>
			<EnvelopeIcon />
		</Button>
		<Button as="a" href="https://github.com/tanerijun" title="See my Github profile">
			<GithubIcon />
		</Button>
		<Button as="a" href="https://twitter.com/tanerivince" title="Say hi on Twitter">
			<TwitterIcon />
		</Button>
		<Button as="a" href="https://www.linkedin.com/in/vincent-taneri/" title="Connect on LinkedIn">
			<LinkedInIcon />
		</Button>
	</div>
</footer>
