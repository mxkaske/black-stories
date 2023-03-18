# Black Stories

> OpenAI Streaming with Vercel edge functions inspired by [beskar blog post](https://www.beskar.co/blog/streaming-openai-completions-vercel-edge)

- Game Examples by [yesnogame](https://yesnogame.net/en/scary)

### TODO:

- Write a better instruction manual for the game (ChatGPT?) and add icons for quick visual feedback
- Use Redis to store statistics about each game.
- Get a percentage of completion of the story to see how much the user needs to answer more.
- Help user by adding significance number for each question (by clicking a hint on button maybe)
- Train model to understand the important story points for a successfull played game. Let the user know if she got an important information by setting points like 2/4. In general, show some progress!
- use cookie to store session (see [beta.nextjs.org](https://beta.nextjs.org/docs/api-reference/file-conventions/route#cookies))
- add dynamic OG images like title of game and personalized data like number of questions till resolved or time needed.
- use `route.ts` for app API routing (next bigger update)
- add tips (in footer maybe - _not_ in information) like:
  1. Is it important where/what/who?
  2. ... (check for more tips)
- Add a `trained` badge for trained games to let the user know about accuracy?
- Add a `not accurate` button for solved games that have not been solved yet
- we have two mixing types, in `validation` and `types`
- replace `lucide` with `hero` icons

### TBD:

- Twitter is [caching link cards for 7 days](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started). The redis content will be deleted based on `ttl`. It will happen that the card image will change over time.

### FIXME:

- tailwindcss HMR troubles - downgraded next to `13.0.4` (see [Issue](https://github.com/tailwindlabs/tailwindcss/issues/9954))!
- once solved, use `cookies()` in RSC to access redis data (see [issue](https://github.com/vercel/next.js/issues/45979)). Currently, it works in `app/page.ts` but **not** in `app/[slug]/page.ts`. As a workaround, we are using `middleware` to [rewrite](https://nextjs.org/docs/api-reference/next.config.js/rewrites) the token within the `Response` as search param while masking the token! It is not seen for the user.
