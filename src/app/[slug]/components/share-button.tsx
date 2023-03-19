"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

// https://stackoverflow.com/a/40786371
function getCookie(n: string) {
  let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
  return a ? a[1] : "";
}

// TBD: Use HoverCard with OG Image Preview

export default function ShareButton({ slug }: { slug: string }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClicked(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [clicked]);

  const getText = () => {
    const _token = getCookie("token");
    return `${window.location}?_token=${_token}`;
  };

  const onClick = () => {
    navigator.clipboard.writeText(getText());
    setClicked(true);
  };
  return (
    <Button onClick={onClick} size="sm" variant="outline">
      {clicked ? (
        <>
          <span>Link copied</span>
          <Check className="ml-1 h-4 w-4" />
        </>
      ) : (
        <>
          <span>Challenge a friend</span>
          <Copy className="ml-1 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
