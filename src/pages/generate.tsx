import useGenerate from "@/hooks/useGenerate";
import { generatePrompt } from "@/lib/prompt";
import React from "react";

const prompt =
  // 'Decide whether a Tweet\'s sentiment on a scale of 0 to 10.\n\nTweet: "I did not really like the new batman movie."\nSentiment:';
  "Write a tweet about chatgpt";

const Page = () => {
  // const text = useGenerate(example("Was something dangerous in her body?"));
  const text = useGenerate(prompt);
  return (
    <div>
      <h1>Hello World!</h1>
      <p>{!!text ? text : null}</p>
    </div>
  );
};

export default Page;
