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
import { IconButton } from "@/components/ui/icon-button";
import { Info } from "lucide-react";

export default function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton name="info" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`How to play 'Black Stories'?`}</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>
        <div className="text-gray-700">
          <p>{`You will be confronted to a specific situation. The goal of this game will be to find out how something specific happened. You ask questions that can be answered with 'Yes' and 'No'.`}</p>
          <p>
            {`Every answer will have a significance value (0 - 5) that will help you to evaluate the question. The higher, the better.`}
          </p>
          <p className="pt-4 text-xs text-gray-500">
            {`This game is powered by OpenAI's GPT-3.`}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
