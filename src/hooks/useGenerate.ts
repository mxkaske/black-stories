import React from "react";

// streaming currently not supported
// https://beta.openai.com/docs/libraries/node-js-library
// blog post about how to enable streaming
// https://www.beskar.co/blog/streaming-openai-completions-vercel-edge

const useGenerate = (prompt?: string) => {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = response.body;

      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();

      let done = false;
      let tempState = "";

      while (!done) {
        // eslint-disable-next-line no-await-in-loop
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const newValue = decoder.decode(value).split("\n\n").filter(Boolean);

        if (tempState) {
          newValue[0] = tempState + newValue[0];
          tempState = "";
        }

        newValue.forEach((newVal) => {
          try {
            const json = JSON.parse(newVal.replace("data: ", "")) as {
              id: string;
              object: string;
              created: number;
              choices?: {
                text: string;
                index: number;
                logprobs: null;
                finish_reason: null | string;
              }[];
              model: string;
            };

            if (!json.choices?.length) {
              throw new Error("Something went wrong.");
            }

            const choice = json.choices[0];

            setText((prev) => prev + choice.text);
          } catch (error) {
            tempState = newVal;
          }
        });
      }
    };
    fetchData();
  }, [prompt]);
  return text;
};

export default useGenerate;
