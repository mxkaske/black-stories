import { ReactNode } from "react";
import { allGames } from "contentlayer/generated";

// // REMINDER: dynamic rerender https://beta.nextjs.org/docs/api-reference/segment-config#revalidate
// export const revalidate = process.env.NODE_ENV === "development" ? false : 0;

// TBD: cookies() cannot be used with static pages - need to remove it?
// export async function generateStaticParams() {
//   return allGames.map(({ slug }) => ({ slug }));
// }

export const dynamic = "force-dynamic";

export default function LayoutPage({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
