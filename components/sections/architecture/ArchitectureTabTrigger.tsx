import { TabsTrigger } from "@/components/ui/Tabs";
import type { TabValue } from "@/lib/data/architecture";
import { cn } from "@/lib/utils";

const tabTriggerBase = cn(
  "flex-none shrink-0 after:!opacity-0 whitespace-nowrap",
  "rounded-[8px] h-[54px] items-center justify-center px-6 border-2 border-transparent text-center",
  "text-[28px] font-bold leading-[135.8%] tracking-[-0.661px]",
  "[font-feature-settings:'liga'_off,'clig'_off] font-[family-name:var(--font-pretendard)]",
  "text-[var(--semantic-label-disable)]"
);

const tabTriggerByValue: Record<TabValue, string> = {
  service: cn(
    tabTriggerBase,
    "data-[state=active]:text-[var(--linus-green-light)] data-[state=active]:border-[var(--linus-green-light)] data-[state=active]:!bg-[var(--linus-service-active-bg)]"
  ),
  platform: cn(
    tabTriggerBase,
    "data-[state=active]:text-[var(--linus-dark-green)] data-[state=active]:border-[var(--linus-dark-green)] data-[state=active]:!bg-[var(--linus-platform-active-bg)]"
  ),
  foundation: cn(
    tabTriggerBase,
    "data-[state=active]:text-[var(--linus-foundation)] data-[state=active]:border-[var(--linus-foundation)] data-[state=active]:!bg-[var(--linus-foundation-active-bg)]"
  ),
};

type ArchitectureTabTriggerProps = {
  value: TabValue;
  children: React.ReactNode;
};

export function ArchitectureTabTrigger({
  value,
  children,
}: ArchitectureTabTriggerProps) {
  return (
    <TabsTrigger value={value} className={tabTriggerByValue[value]}>
      {children}
    </TabsTrigger>
  );
}
