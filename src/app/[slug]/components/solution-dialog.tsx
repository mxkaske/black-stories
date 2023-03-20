"use client";

import { Button } from "@/components/ui/button";
// import { allGames } from "contentlayer/generated";
import allGames from "@/content/hotfix_allGames.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode, useReducer } from "react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

export default function SolutionDialog({ slug }: { slug: string }) {
  const game = allGames.find((g) => g.slug === slug); // has to be defined, otherwise notFound() in page.tsx
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <IconButton name="eye" variant="outline" />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>See solution</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solution</DialogTitle>
          <DialogDescription>
            Discover what really happened in{" "}
            <span className="font-medium text-gray-700">{`'${game?.title}'`}</span>
            .
          </DialogDescription>
        </DialogHeader>
        <DiscoverContent>{game?.solution}</DiscoverContent>
      </DialogContent>
    </Dialog>
  );
}

// REMINDER: moved to separate Component to reset state in between
function DiscoverContent({ children }: { children: ReactNode }) {
  const [discover, toggle] = useReducer((prev) => !prev, false);
  return (
    <div className="relative">
      <p className={cn("text-gray-700", !discover && "blur-sm")}>{children}</p>
      {!discover ? (
        <Button
          variant="ghost"
          className="absolute inset-0 flex h-full w-full items-center justify-center hover:bg-transparent"
          onClick={toggle}
        >
          Click to Discover
        </Button>
      ) : undefined}
    </div>
  );
}
