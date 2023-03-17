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
import { AnswerIcon } from "../[slug]/components/list";
import { ANSWERS } from "@/lib/validation";

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
          <p>{`You will be confronted to a specific situation. The goal of this game will be to find out how something specific happened.`}</p>
          {/* TODO: List of AnswerIcon! */}
          <p>
            The possible answers to the questions you ask are{" "}
            <span className="font-bold">ONLY</span>:
          </p>
          <ul className="space-y-2">
            {ANSWERS.map((answer) => (
              <li key={answer}>
                <AnswerIcon answer={answer} />
                <span className="text-xs font-light uppercase tracking-wide">
                  {answer}
                </span>
              </li>
            ))}
          </ul>
          <p>{`The game knows the context and remembers what you have asked.`}</p>
          <p>{`The game is over when the answer is 'Solved'. You might need to help the bot by clicking the 'Did I solve it?'-Button.`}</p>
          <p className="pt-4 text-xs text-gray-500">
            {`This game is powered by OpenAI's GPT-3.`}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
