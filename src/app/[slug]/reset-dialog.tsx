"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Eraser, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

// TODO: create a function fetcher(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>
// allowing to 'merge' deleteChat and updateChat
async function deleteChat(url: string, { arg }: { arg: unknown }) {
  return fetch(url, {
    method: "DELETE",
  });
}

export default function ResetDialog({ slug }: { slug: string }) {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/generate/${slug}`,
    deleteChat
  );

  async function onClick() {
    await trigger();
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isMutating ? (
          <IconButton name="loader2" className="animate-spin" disabled />
        ) : (
          <IconButton name="eraser" variant="destructive" />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to reset the game?</AlertDialogTitle>
          <AlertDialogDescription>
            It will reset the history of the questions/answers and you can
            restart the game. You cannot undo the action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={onClick}>
              Reset
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
