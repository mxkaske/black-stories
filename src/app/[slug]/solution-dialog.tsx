"use client";

import { Button } from "@/components/ui/button";
import { allGames } from "contentlayer/generated";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SolutionDialog({ slug }: { slug: string }) {
  const game = allGames.find((g) => g.slug === slug); // has to be defined, otherwise notFound() in page.tsx

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">See Solution</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{game?.title}</DialogTitle>
          <DialogDescription>{game?.solution}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
