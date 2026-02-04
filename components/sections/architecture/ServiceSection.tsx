"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/Tabs";
import {
  type TabValue,
  SERVICE_CARDS,
  PLATFORM_CARDS,
  FOUNDATION_CARDS,
} from "@/lib/data/architecture";
import { cn } from "@/lib/utils";
import { Box } from "@/components/ui/Box";
import { ArchitectureCardGrid } from "./ArchitectureCardGrid";
import { ArchitectureTabTrigger } from "./ArchitectureTabTrigger";

const boxBorderByTab: Record<TabValue, string> = {
  service: "border-linus-service",
  platform: "border-linus-primary-dark",
  foundation: "border-linus-foundation",
};

const cardBaseClassName = cn(
  "rounded-xl border border-white/40 shadow-card"
);

const cardClassNameByTab = {
  service: cn(cardBaseClassName, "bg-linus-service-light/80"),
  platform: cn(
    cardBaseClassName,
    "bg-linus-primary-dark-bg border-linus-primary-dark-border"
  ),
  foundation: cn(
    cardBaseClassName,
    "bg-linus-foundation-bg border-linus-foundation-border"
  ),
} as const;

const titleClassNameByTab = {
  service: "text-[20px] font-bold text-linus-service",
  platform: "text-[20px] font-bold text-linus-primary-dark",
  foundation: "text-[20px] font-bold text-linus-foundation",
} as const;

type ServiceSectionProps = {
  "aria-labelledby"?: string;
};

export function ServiceSection({ "aria-labelledby": ariaLabelledBy }: ServiceSectionProps) {
  const [activeTab, setActiveTab] = useState<TabValue>("service");

  return (
    <Box
      as="section"
      className="w-full px-4 md:px-6 lg:px-8"
      aria-labelledby={ariaLabelledBy}
    >
      <Box
        className={cn(
          "rounded-2xl border-2 p-6 lg:p-8 bg-white/50",
          boxBorderByTab[activeTab]
        )}
      >
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabValue)}
          className="w-full"
        >
          <TabsList
            variant="line"
            className="w-fit h-auto gap-6 bg-transparent p-0 border-b-0 mb-6"
          >
            <ArchitectureTabTrigger value="service">
              Service
            </ArchitectureTabTrigger>
            <ArchitectureTabTrigger value="platform">
              Platform
            </ArchitectureTabTrigger>
            <ArchitectureTabTrigger value="foundation">
              Foundation
            </ArchitectureTabTrigger>
          </TabsList>
          <TabsContent value="service" className="mt-0">
            <ArchitectureCardGrid
              cards={SERVICE_CARDS}
              cardClassName={cardClassNameByTab.service}
              titleClassName={titleClassNameByTab.service}
            />
          </TabsContent>
          <TabsContent value="platform" className="mt-0">
            <ArchitectureCardGrid
              cards={PLATFORM_CARDS}
              cols="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
              cardClassName={cardClassNameByTab.platform}
              titleClassName={titleClassNameByTab.platform}
            />
          </TabsContent>
          <TabsContent value="foundation" className="mt-0">
            <ArchitectureCardGrid
              cards={FOUNDATION_CARDS}
              cardClassName={cardClassNameByTab.foundation}
              titleClassName={titleClassNameByTab.foundation}
            />
          </TabsContent>
        </Tabs>
      </Box>
    </Box>
  );
}
