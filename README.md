# Black Stories

> OpenAI Streaming with Vercel edge functions inspired by [beskar blog post](https://www.beskar.co/blog/streaming-openai-completions-vercel-edge)

- Game Examples by [yesnogame](https://yesnogame.net/en/scary)

### TODO:

- Use `zod` for type validation
- Use Redis to store statistics about each game.
- Get a percentage of completion of the story to see how much the user needs to answer more.
- Train model to understand the important story points for a successfull played game. Let the user know if she got an important information by setting points like 2/4. In general, show some progress!
- use cookie to store session (see [beta.nextjs.org](https://beta.nextjs.org/docs/api-reference/file-conventions/route#cookies))
- add dynamic OG images like title of game and personalized data like number of questions till resolved or time needed.

### FIXME:

- tailwindcss HMR troubles - downgraded next to `13.0.4` (see [Issue](https://github.com/tailwindlabs/tailwindcss/issues/9954))!
