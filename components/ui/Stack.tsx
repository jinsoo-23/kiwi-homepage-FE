import { cn } from "@/lib/utils";

type StackProps = {
  direction?: "row" | "column";
  gap?: 2 | 3 | 4 | 6 | 8 | 10 | 80 | 200;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  className?: string;
  children?: React.ReactNode;
};

const gapMap = {
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  80: "gap-[80px]",
  200: "gap-[200px]",
} as const;

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const;

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

export function Stack({
  direction = "column",
  gap,
  align,
  justify,
  className,
  children,
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "column" ? "flex-col" : "flex-row",
        gap !== undefined && gapMap[gap],
        align !== undefined && alignMap[align],
        justify !== undefined && justifyMap[justify],
        className
      )}
    >
      {children}
    </div>
  );
}
