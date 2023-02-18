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
        <Button variant="ghost" disabled={isMutating}>
          {isMutating ? "Reseting..." : "Reset Game"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
