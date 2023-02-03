<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import EnvelopeIcon from '$lib/components/icons/EnvelopeIcon.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import LinkedInIcon from '$lib/components/icons/LinkedInIcon.svelte';
	import TwitterIcon from '$lib/components/icons/TwitterIcon.svelte';
	import SocialLink from './SocialLink.svelte';
</script>

<footer class="flex items-center justify-between py-4">
	<p>&#169; Copyright 2022-{new Date().getFullYear()} Vincent Taneri</p>

	<!-- Social links -->
	<div class="flex items-center space-x-2">
		<SocialLink href="mailto:tanerivince@gmail.com" title="Send an email to tanerivince@gmail.com">
			<EnvelopeIcon size={22} />
		</SocialLink>
		<SocialLink href="https://github.com/tanerijun" title="See my Github profile">
			<GithubIcon size={22} />
		</SocialLink>
		<SocialLink href="https://twitter.com/tanerivince" title="Say hi on Twitter">
			<TwitterIcon size={22} />
		</SocialLink>
		<SocialLink href="https://www.linkedin.com/in/vincent-taneri/" title="Connect on LinkedIn">
			<LinkedInIcon size={22} />
		</SocialLink>
	</div>
</footer>
