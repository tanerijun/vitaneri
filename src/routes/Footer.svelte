<script lang="ts">
	import EnvelopeIcon from '$lib/components/icons/EnvelopeIcon.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import LinkedInIcon from '$lib/components/icons/LinkedInIcon.svelte';
	import RssIcon from '$lib/components/icons/RSSIcon.svelte';
	import TwitterIcon from '$lib/components/icons/TwitterIcon.svelte';
	import SocialLink from '$lib/components/SocialLink.svelte';
</script>

<footer class="mt-14 flex flex-col-reverse items-center justify-between gap-4 py-6 md:flex-row">
	<p class="font-heading text-sm">
		&#169; Copyright 2022-{new Date().getFullYear()} Vincent Taneri
	</p>

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
		<SocialLink href="https://vitaneri.com/rss.xml" title="View RSS URL">
			<RssIcon size={22} />
		</SocialLink>
	</div>
</footer>
