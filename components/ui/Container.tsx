import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  id?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
  children?: React.ReactNode;
};

const maxWidthMap = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1440px]",
  "2xl": "max-w-[1920px]",
  full: "max-w-full",
} as const;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ id, maxWidth = "xl", className, children }, ref) {
    return (
      <div
        id={id}
        ref={ref}
        className={cn("mx-auto w-full", maxWidthMap[maxWidth], className)}
      >
        {children}
      </div>
    );
  }
);
