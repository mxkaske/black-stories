import { cn } from "@/lib/utils";
import { ChatInteraction } from "@/types";
import { CheckCircle2, MinusCircle, Trophy, XCircle } from "lucide-react";

export default function List({ data }: { data: ChatInteraction[] }) {
  return (
    <div className="my-2 flow-root">
      <ul role="list" className="-mb-4">
        {data.map(({ question, answer }, i) => {
          const disiQuestion = question === "Did I solve it?";
          return (
            <li key={i}>
              <div className="relative pb-4">
                {i !== data.length - 1 ? (
                  <span
                    className="absolute top-3 left-3 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ring-white"
                      )}
                    >
                      <AnswerIcon answer={answer} />
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex min-w-0 flex-1 justify-between space-x-4 pt-0.5",
                      { "font-light opacity-70": disiQuestion }
                    )}
                  >
                    <div>
                      <p className="text-sm text-gray-700">{question}</p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm font-light uppercase tracking-wide text-gray-500">
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const AnswerIcon = ({
  answer,
}: {
  answer: ChatInteraction["answer"];
}) => {
  const rootClassname = "h-5 w-5 inline";
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
