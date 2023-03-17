import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Eraser,
  Eye,
  Info,
  Loader2,
  Link,
  Copy,
  Check,
  Share2,
} from "lucide-react";

const iconButtonVariants = cva(
  "p-2 border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-gray-900 hover:bg-gray-50",
        destructive: "text-red-500 border-red-100 hover:bg-red-50",
        outline: "border-gray-200 hover:bg-gray-100",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "circle",
    },
  }
);

const icons = {
  link: Link,
  loader2: Loader2,
  eraser: Eraser,
  info: Info,
  eye: Eye,
  copy: Copy,
  check: Check,
  share: Share2,
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  name: keyof typeof icons;
}

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, name, ...props }, ref) => {
    const Icon = icons[name];
    return (
      <button
        className={cn(iconButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <Icon className="h-4 w-4" />
        <span className="sr-only">{name}</span>
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
