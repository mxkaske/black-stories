"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, KeyboardEvent } from "react";
import useSWRMutation from "swr/mutation";

async function updateChat(url: string, { arg }: { arg: unknown }) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg), // REMINDER: { question }
  });
}

export function Form() {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(`/api/chat`, updateChat);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      question: { value: string };
    };
    await trigger({ question: target.question.value });
    ref.current?.reset();
    router.refresh();
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      // ref.current?.submit();
    }
  }

  return (
    <form ref={ref} className="grid gap-2" onSubmit={onSubmit}>
      <textarea
        name="question"
        className="resize-none rounded-md border py-1 px-2 placeholder:text-gray-400"
        placeholder="Did someone murder her?"
        disabled={isMutating}
        onKeyDown={onKeyDown}
        required
      />
      <button
        className="rounded-md border bg-white px-3 py-2 hover:bg-gray-50"
        disabled={isMutating}
      >
        {isMutating ? "Loading..." : "Ask Question"}
      </button>
    </form>
  );
}
