"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateRequest } from "@/lib/fetcher";
import { Loader2 } from "lucide-react";
import { FormEvent, useRef, KeyboardEvent } from "react";
import useSWRMutation from "swr/mutation";

export function Form({ slug }: { slug: string }) {
  const ref = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { trigger, isMutating } = useSWRMutation(
    `/api/generate/${slug}`,
    updateRequest
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      question: { value: string };
    };
    await trigger({ question: target.question.value });
    ref.current?.reset();
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      // REMINDER: ref.current?.submit() would magically refresh the whole page
      buttonRef.current?.click();
    }
  }

  return (
    <form ref={ref} className="grid gap-2" onSubmit={onSubmit}>
      <Textarea
        name="question"
        className="resize-none bg-white/70"
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
