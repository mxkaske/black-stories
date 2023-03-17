import { cn } from "@/lib/utils";
import { ChatInteraction } from "@/types";
import { CheckCircle2, MinusCircle, Trophy, XCircle } from "lucide-react";

export default function List({ data }: { data: ChatInteraction[] }) {
  return (
    <ol className="grid list-inside list-decimal gap-2 text-gray-900">
      {data.map(({ question, answer }, i) => {
        const disiQuestion = question === "Did I solve it?";
        return (
          <li
            key={i}
            className={cn("", {
              "font-light opacity-80": disiQuestion,
            })}
          >
            <span>{question}</span>
            <AnswerIcon answer={answer} />
            <span className="text-xs font-light uppercase tracking-wide">
              {answer}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export const AnswerIcon = ({
  answer,
}: {
  answer: ChatInteraction["answer"];
}) => {
  const rootClassname = "mx-2 h-5 w-5 inline";
  switch (answer) {
    case "Yes":
      return <CheckCircle2 className={cn(rootClassname, "text-green-500")} />;
    case "No":
      return <XCircle className={cn(rootClassname, "text-red-500")} />;
    case "N/A":
      return <MinusCircle className={cn(rootClassname, "text-gray-600")} />;
    case "Solved":
      return <Trophy className={cn(rootClassname, "text-yellow-500")} />;
    default:
      const _check: never = answer;
      return _check;
  }
};
