# Vitaneri

My own personal corner of the Internet.

## Generate Content

- Make sure that Node is installed and configured correctly
- Run the following command in terminal:
  ```
  `npm run create`
  ```

## Markdown Support

- Write blog posts using markdown in the `content/posts` folder in project root.
  - The file has to be put inside a folder with post title as it's name, and the file inside is called `index.md` by convention.
    ```
    /content/posts/my-first-post/index.md
    ```
- You can also write TIL using markdown in the `content/TILs` folder in the project root.
  - The naming convention for TIL is:
    ```
    /content/TILs/0123.md
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
