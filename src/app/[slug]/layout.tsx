import { ReactNode } from "react";

// REMINDER: needed to access cookies() on page
export const dynamic = "force-dynamic";

export default function LayoutPage({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
