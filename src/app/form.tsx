"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
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

  return (
    <form ref={ref} className="grid gap-4" onSubmit={onSubmit}>
      <textarea
        name="question"
        className="border rounded-md py-1 px-2 -mx-2"
        required
      />
      <button
        disabled={isMutating}
        className="border rounded-md px-3 py-2 -mx-2 hover:bg-gray-50"
      >
        {isMutating ? "Loading..." : "Ask Question"}
      </button>
    </form>
  );
}
