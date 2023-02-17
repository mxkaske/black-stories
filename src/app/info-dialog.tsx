import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Info } from "lucide-react";

export default function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Info className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`How does 'Black Stories' work?`}</DialogTitle>
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