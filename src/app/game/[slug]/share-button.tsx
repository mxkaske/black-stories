"use client";

import { IconButton } from "@/components/ui/icon-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useReducer } from "react";

// https://stackoverflow.com/a/40786371
function getCookie(n: string) {
  let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
  return a ? a[1] : "";
}

export default function ShareButton() {
  const [open, toggle] = useReducer((prev) => !prev, false);

  const onClick = () => {
    const _token = getCookie("token");
    navigator.clipboard.writeText(`${window.location}?_token=${_token}`);
  };
  return (
    // <TooltipProvider>
    //   <Tooltip>
    //     <TooltipTrigger>
    <IconButton name="link" variant="outline" onClick={onClick} />
    //         </TooltipTrigger>
    //         <TooltipContent>
    //           <p>Copy link</p>
    //         </TooltipContent>
    //       </Tooltip>
    //     </TooltipProvider>
  );
}
