import { cn } from "@/lib/utils";

type CenterProps = {
  className?: string;
  children?: React.ReactNode;
};

export function Center({ className, children }: CenterProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {children}
    </div>
  );
}
