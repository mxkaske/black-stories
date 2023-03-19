import { cn } from "@/lib/utils";
import { default as NextLink, LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Link({
  href,
  className,
  children,
  ...props
}: LinkProps) {
  const isInternal = href.toString().startsWith("/");
  const rootClassname =
    "font-medium text-gray-900 underline-offset-4 hover:underline";
  if (!isInternal) {
    return (
      <a
        className={cn(rootClassname, className)}
        href={href.toString()}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={cn(rootClassname, className)} {...props}>
      {children}
    </NextLink>
  );
}
