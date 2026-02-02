import { cn } from "@/lib/utils";

const glassPill = cn(
  "rounded-[100px] border border-white/20 bg-white/10",
  "shadow-[var(--shadow-glass)] backdrop-blur-md"
);

export const pillButton = {
  locale: cn(
    "rounded-[100px] border border-line-non-opaque-primary bg-fill-normal",
    "text-label-regular text-xs font-bold hover:bg-fill-normal/80"
  ),
  localeSize: "py-[6px] px-3 rounded-[100px]",
} as const;

export const header = {
  root: cn(
    "flex justify-between items-center w-full my-5 mx-auto py-3",
    "max-w-full md:max-w-[768px] md:px-6 lg:max-w-[1440px] lg:px-8",
    glassPill
  ),
  overlay: "sticky top-5 left-0 right-0 z-50 w-full px-4 md:px-6 lg:px-8",
} as const;
