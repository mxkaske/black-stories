const { readFileSync } = require("fs");

const basePath = `./src/content`;
const readPath = `${basePath}/games/002.json`;
const writePath = `${basePath}/model.json`; // *.jsonl

// REMINDER: path might need to be updated based on where the `node` script is called.
const data = readFileSync(readPath);
const object = JSON.parse(data);

const rules = `The description is known by the user and he/she needs to find the result. You are only allowed to answer with a single word. Mostly "yes"/"no"/"sometimes"/"probably"/"n/a",...`;

const examples = object.training
  .map(({ question, answer }) => {
    return `Q: ${question}\nA: ${answer}\n\n`;
  })
  .join("");

let prompt = `We are playing a game called ${object.name}.\nRules: ${rules}\nDescription: ${object.description}\nResult: ${object.answer}\n\nHere are some examples for this specific game:\n\n${examples}`;

// console.log(JSON.parse(data));

// $ node src/scripts/train-model.js
console.log(prompt);
