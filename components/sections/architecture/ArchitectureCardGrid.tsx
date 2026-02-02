import type { ArchitectureCard as ArchitectureCardType } from "@/lib/data/architecture";
import { Grid } from "@/components/ui/Grid";
import { ArchitectureCard } from "./ArchitectureCard";

type ArchitectureCardGridProps = {
  cards: readonly ArchitectureCardType[];
  cols?: string;
  cardClassName?: string;
  titleClassName?: string;
};

export function ArchitectureCardGrid({
  cards,
  cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  cardClassName,
  titleClassName,
}: ArchitectureCardGridProps) {
  return (
    <Grid cols={cols} gap={4}>
      {cards.map((card) => (
        <ArchitectureCard
          key={card.title}
          card={card}
          cardClassName={cardClassName}
          titleClassName={titleClassName}
        />
      ))}
    </Grid>
  );
}
