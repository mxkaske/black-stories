import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";

export const Game = defineDocumentType(() => ({
  name: "Game",
  filePathPattern: "games/*.md",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the game",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the game",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the game",
      required: true,
    },
    solution: {
      type: "string",
      description: "The solution of the game",
      required: true,
    },
    training: {
      type: "list",
      description: "The training of the game",
      of: Training,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (_) => _._raw.sourceFileName.replace(/\.[^.$]+$/, ""),
    },
    url: {
      type: "string",
      resolve: (_) => `/game/${_._raw.sourceFileName.replace(/\.[^.$]+$/, "")}`,
    },
  },
}));

const Training = defineNestedType(() => ({
  name: "Training",
  fields: {
    question: { type: "string", required: true },
    answer: { type: "enum", options: ["Yes", "No", "N/A"], required: true },
    // only whole numbers between 0 and 5
    significance: {
      type: "number",
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Game],
});
