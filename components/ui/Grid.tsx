import { cn } from "@/lib/utils";

type GridProps = {
  cols?: string;
  gap?: 2 | 4 | 6;
  className?: string;
  children?: React.ReactNode;
};

const gapMap = { 2: "gap-2", 4: "gap-4", 6: "gap-6" } as const;

export function Grid({
  cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  gap = 4,
  className,
  children,
}: GridProps) {
  return (
    <div className={cn("grid", cols, gapMap[gap], className)}>
      {children}
    </div>
  );
}
