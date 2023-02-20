"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
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
    // next: { revalidate: 10 },
  });
}

export function Form({ slug }: { slug: string }) {
  const ref = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/generate/${slug}`,
    updateChat
  );

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
      e.preventDefault();
      // REMINDER: ref.current?.submit() would refresh the whole page
      // we are submitting the form via the submit button
      buttonRef.current?.click();
    }
  }

  return (
    <form ref={ref} className="grid gap-2" onSubmit={onSubmit}>
      <Textarea
        name="question"
        className="resize-none bg-white/70" // make it slightly transparent with opacity-70
        placeholder="Did someone murder her?"
        disabled={isMutating}
        onKeyDown={onKeyDown}
        required
      />
      <Button disabled={isMutating} ref={buttonRef}>
        {isMutating ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Ask Question"
        )}
      </Button>
    </form>
  );
}
