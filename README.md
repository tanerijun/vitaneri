## TODO

- [x] Style "Skip to content" in <header>
- [x] Make <header> responsive
- [x] Rewrite ThemeToggler ~~with Headless Menu~~ as a Button that toggle over 3 themes
- [x] Remove unnecessary metadata from frontmatter
- [x] Remove unnecessary metadata type in $lib/types like featured, draft, ...
- [ ] Comments all components. ex: <!-- @component Allows you to quickly navigate the hierarchy of headings for the current page. -->
- [ ] Implement side-wide search, try Lyra
- [x] rss, sitemap
- [x] Make sure every decorative line like those in NavLinks and TOC is rounded (border-radius)
- [x] Show post's tags on blog post
- [x] Allow people to filter by tag in posts route
- [ ] Make sure the HTML structure of each page is correct and consistent
- [ ] Run site through accessibility checker
- [ ] Make sure the spacing separating header and footer is consistent on every page. Don't put margin in <section> on every page, instead put it on the heading and footer to ensure consistency
- [ ] Test utils
- [ ] e2e testing
- [ ] Write a generator for blog post, consider using [clack](https://github.com/natemoo-re/clack)
- [x] Ability to highlight code using this kind of syntax js {3-5}
- [x] Add snippets section, collecting code snippets in md file
- [x] Remove unnecessary color from theme, and better css variable name
- [x] 404 page
- [x] Group post and TILs in one folder (idea: content)
- [x] /content/posts/make-image-fade-to-transparent-with-css/index.md:13:3 A11y: Screenreaders already announce <img> elements as an image.
- [x] /content/posts/understanding-space-complexity-of-algorithm/index.md:98:3 A11y: Screenreaders already announce <img> elements as an image.

## Idea about to be ditched

- [ ] Add next post and prev post after blog post, just use the next and previous from "posts" route. (Unnecessary clutter)
- [ ] Consider using [vscode icons](https://icones.js.org/collection/vscode-icons) for tools in about section
- [ ] Show post tags on blog card
- [ ] Make TOC mobile responsive, maybe showing it above the post
- [ ] May also consider adding Giscus

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

## Code Block's Feature

1. Highlight particular lines inside code block using curly braces.

- `js {1}` will highlight the first line.
- `js {3-5}` will highlight line 3 to 5.
- You can also mix things up. `js {1, 3-5}` will highlight the first line and line 3 to 5.

2. Give the code block a title

- Example: `jsx title="Graph.tsx"`

3. Show line numbers

- Example: `jsx showLineNumbers`
- Show line numbers with custom starting line. Example: `jsx showLineNumbers{15}` will start from line 15.
