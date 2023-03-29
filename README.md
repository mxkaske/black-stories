# Black Stories

### Welcome to the Game Lab

This is an Open Source project running with the awesome frameworks/libraries/APIs:

- [Nextjs 13](https://beta.nextjs.org) `/app`
- [Upstash](https://upstash.com) Redis
- [Radix UI](http://radix-ui.com/) including [ui.shadcn.com](http://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com)
- [Zod](https://zod.dev)
- [OpenAI](https://openai.com)
- [Contentlayer](https://contentlayer.dev) **Missing Nextjs 13.2.1 support**

> This project is a Work In Progress. Feel free to DM me [@mxkaske](http://twitter.com/mxkaske) for feedback.

- Game Examples by [yesnogame](https://yesnogame.net/en/scary)

---

### TODO:

- Write a better instruction manual for the game (ChatGPT?) and add icons for quick visual feedback
- Use Redis to store statistics about each game.
- Get a percentage of completion of the story to see how much the user needs to answer more.
- Help user by adding significance number for each question (by clicking a hint on button maybe)
- Train model to understand the important story points for a successfull played game. Let the user know if she got an important information by setting points like 2/4. In general, show some progress!
- use `route.ts` for app API routing
- add tips (in footer maybe - _not_ in information) like:
  1. Is it important where/what/who? (how to ask questions)
  2. ... (check for more tips)
- Add a `not accurate` button for solved games that have not been solved yet
- we have two mixing types, in `validation` and `types`
- replace `lucide` with `hero` icons
- create a filter on list (e.g. difficulty,..)

### TBD:

- Twitter is [caching link cards for 7 days](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started). The redis content will be deleted based on `ttl`. It will happen that the card image will change over time.

### REMINDER:

- OpenAI Streaming with Vercel edge functions by [beskar blog post](https://www.beskar.co/blog/streaming-openai-completions-vercel-edge)
