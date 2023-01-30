<script>
	import '../app.postcss';
</script>

<div id="site-container">
	<header>
		<nav>Test</nav>
	</header>

	<main class="min-h-screen">
		<slot />
	</main>

	<footer class="flex justify-between">
		<p>&#169; Copyright 2023 Vincent Taneri</p>
		<div>Social Icons Placeholder</div>
	</footer>
</div>
