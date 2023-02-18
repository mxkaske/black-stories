import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export default function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Info className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`How to play 'Black Stories'?`}</DialogTitle>
          <DialogDescription>
            <p>{`You will be confronted to a specific situation. The goal of this game will be to find out how something specific happened. You ask questions that can be answered with 'Yes' and 'No'.`}</p>
            <p>
              {`Every answer will have a significance value (0 - 5) that will help you to evaluate the question. The higher, the better.`}
            </p>
            <p className="pt-4 text-xs text-gray-500">
              {`This game is powered by OpenAI's GPT-3.`}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
