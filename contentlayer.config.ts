// import { defineDocumentType, makeSource } from "contentlayer/source-files";

// export const Game = defineDocumentType(() => ({
//   name: "Game",
//   filePathPattern: "games/*.md",
//   contentType: "mdx",
//   fields: {
//     title: {
//       type: "string",
//       description: "The title of the game",
//       required: true,
//     },
//     date: {
//       type: "date",
//       description: "The date of the game",
//       required: true,
//     },
//     description: {
//       type: "string",
//       description: "The description of the game",
//       required: true,
//     },
//     solution: {
//       type: "string",
//       description: "The solution of the game",
//       required: true,
//     },
//   },
//   computedFields: {
//     slug: {
//       type: "string",
//       resolve: (_) => _._raw.sourceFileName.replace(/\.[^.$]+$/, ""),
//     },
//     url: {
//       type: "string",
//       resolve: (_) => `/${_._raw.sourceFileName.replace(/\.[^.$]+$/, "")}`,
//     },
//   },
// }));

// export default makeSource({
//   contentDirPath: "content",
//   documentTypes: [Game],
// });

// TODO: replace by contentlayer once Nextjs 13.2.1 is supported
export default {};
