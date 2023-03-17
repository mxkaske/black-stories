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
import { IconButton } from "@/components/ui/icon-button";

export default function InfoDialog() {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <IconButton name="info" />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Instructions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`How to play 'Black Stories'?`}</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>
        <div className="space-y-2 text-sm text-gray-700">
          <p>{`You will be confronted to a specific situation. The goal of this game will be to find out how something specific happened. You have to ask questions that can be answered with 'Yes', 'No' or 'N/A' if the answer is unspecific.`}</p>
          <p>{`The game knows the context and remembers what you have asked.`}</p>
          <p>{`The game is over when the answer is 'Solved'. Sometimes, you might need to help the bot with "Did I solve the riddle?".`}</p>
          <p className="pt-4 text-xs text-gray-500">
            {`This game is powered by OpenAI's GPT-3.`}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
