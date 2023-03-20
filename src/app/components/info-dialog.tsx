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
        <div className="space-y-1 text-sm text-gray-700">
          <p>You will be confronted to a mysterious story.</p>
          <p>
            You will ask yes-or-no questions in order to try to solve the
            mystory.
          </p>
          <p>The only answers to your questions are: </p>
          <ul className="my-3 space-y-1">
            {ANSWERS.map((answer) => (
              <li key={answer}>
                <AnswerIcon answer={answer} />
                <span className="ml-2 text-xs font-light uppercase tracking-wide">
                  {answer}
                </span>
              </li>
            ))}
          </ul>
          <p>
            You must try to solve the mystery with the fewest questions
            possible.
          </p>
          <p>{`The game is over when the answer is 'Solved'. You might need to help the bot by clicking the 'Did I solve it?'-Button.`}</p>
          <p className="pt-4 text-xs text-gray-500">
            This game is powered by GPT-3 from OpenAI.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
