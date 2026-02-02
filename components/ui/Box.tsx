import { cn } from "@/lib/utils";

type BoxElement = "div" | "section" | "article" | "main" | "header" | "aside";

type BoxProps = React.HTMLAttributes<HTMLElement> & {
  as?: BoxElement;
  className?: string;
  children?: React.ReactNode;
};

export function Box({
  as: Comp = "div",
  className,
  children,
  ...props
}: BoxProps) {
  return (
    <Comp className={cn(className)} {...props}>
      {children}
    </Comp>
  );
}
