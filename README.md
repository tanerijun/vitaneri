## TODO

- [ ] Style "Skip to content" in <header>
- [x] Make <header> responsive
- [x] Rewrite ThemeToggler ~~with Headless Menu~~ as a Button that toggle over 3 themes
- [ ] Remove unnecessary metadata from frontmatter
- [ ] Remove unnecessary metadata type in $lib/types like featured, draft, ...
- [ ] Comments all components. ex: <!-- @component Allows you to quickly navigate the hierarchy of headings for the current page. -->
- [ ] Implement side-wide search
- [ ] rss, sitemap
- [ ] Make sure every decorative line like those in NavLinks and TOC is rounded (border-radius)
- [ ] Show post's tags on blog post
- [ ] Show post tags on blog card
- [ ] Allow people to filter by tag in posts route
- [ ] Make sure the HTML structure of each page is correct
- [ ] Run site through accessibility checker
- [ ] Consider using [vscode icons](https://icones.js.org/collection/vscode-icons) for tools in about section
- [ ] Make sure the spacing separating header and footer is consistent on every page. Don't put margin in <section> on every page, instead put it on the heading and footer to ensure consistency
- [ ] May also consider adding Giscus
- [ ] Make TOC mobile responsive, maybe showing it above the post
- [ ] Test utils
- [ ] e2e testing
- [ ] Write a generator for blog post
- [ ] Ability to highlight code using this kind of syntax js {3-5}

## Markdown Blog

- Write blog posts using markdown in the `posts` folder in project root.
- The file has to be put inside a folder with post title as it's name, and the file inside is called `index.md` by convention.
  ```
  /posts/my-first-post/index.md
  ```
- Supported extensions: `.md`, `.svelte.md`, `.svx`.
  - Using `.svelte.md` and `.svx` extensions, you can put a Svelte component inside the markdown.
  - But it's recommended to just use `.md` for maximum portability.
- All markdown syntax is supported.
- Video is also supported.
  - Supported format: `.mp4` and `.webm`.
- Relative link to assets is also supported.
  ```md
  ![penguins](./assets/penguins.jpeg)
  ![penguins](./assets/penguins.mp4)
  ```
- Highlight particular lines inside code block using curly braces.
  - `js {1}` will highlight the first line.
  - `js {3-5}` will highlight line 3 to 5.
