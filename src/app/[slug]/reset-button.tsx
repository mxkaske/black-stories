"use client";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

// TODO: create a function fetcher(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>
// allowing to 'merge' deleteChat and updateChat
async function deleteChat(url: string, { arg }: { arg: unknown }) {
  return fetch(url, {
    method: "DELETE",
  });
}

export function ResetButton({ slug }: { slug: string }) {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/generate/${slug}`,
    deleteChat
  );

  async function onClick() {
    // FIXME: cancel via "ENTER" will still trigger event
    if (confirm("Do you want to reset the game?")) {
      await trigger();
      router.refresh();
    }
  }

  return (
    <button
      className="w-full rounded-md border bg-white px-3 py-2 text-red-500 hover:bg-red-50"
      disabled={isMutating}
      onClick={onClick}
    >
      {isMutating ? "Reseting..." : "Reset Game"}
    </button>
  );
}
