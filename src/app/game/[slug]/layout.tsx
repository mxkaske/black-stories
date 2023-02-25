import { ReactNode } from "react";
import { allGames } from "contentlayer/generated";

// // REMINDER: dynamic rerender https://beta.nextjs.org/docs/api-reference/segment-config#revalidate
// export const revalidate = process.env.NODE_ENV === "development" ? false : 0;

// REMINDER: It doesn't make any sense?!? Static pages cannot access the cookies - why then making it static?
// export async function generateStaticParams() {
//   return allGames.map(({ slug }) => ({ slug }));
// }

export default function LayoutPage({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
