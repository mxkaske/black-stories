import useGenerate from "@/hooks/useGenerate";
import React from "react";

const prompt =
  "Convert this text to a programmatic command:\n\nExample: Ask Constance if we need some bread\nOutput: send-msg `find constance` Do we need some bread?\n\nReach out to the ski store and figure out if I can get my skis fixed before I leave on Thursday";

const Page = () => {
  const text = useGenerate(prompt);
  return (
    <div>
      <h1>Hello World!</h1>
      <p>{text}</p>
    </div>
  );
};

export default Page;
