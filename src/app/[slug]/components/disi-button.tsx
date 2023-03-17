"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { updateChat } from "./form";

// REMINDER: 'Did I Solve It'-Button
export default function DISIButton({ slug }: { slug: string }) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/generate/${slug}`,
    updateChat
  );
  const router = useRouter();

  const onClick = async () => {
    await trigger({ question: "Did I solve it?" });
    router.refresh();
  };
  return (
    <button
      className="rounded-md text-xs font-medium text-gray-900 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      onClick={onClick}
      disabled={isMutating}
    >
      {isMutating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        "Did I solve it?"
      )}
    </button>
  );
}
