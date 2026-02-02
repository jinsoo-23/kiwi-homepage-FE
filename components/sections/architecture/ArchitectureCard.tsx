import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import type { ArchitectureCard as ArchitectureCardType } from "@/lib/data/architecture";
import { cn } from "@/lib/utils";

type ArchitectureCardProps = {
  card: ArchitectureCardType;
  cardClassName?: string;
  titleClassName?: string;
};

export function ArchitectureCard({
  card,
  cardClassName,
  titleClassName,
}: ArchitectureCardProps) {
  return (
    <Card className={cardClassName}>
      <CardHeader className="pb-2">
        <CardTitle className={titleClassName}>{card.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription
          className={cn("text-[20px] text-[var(--label-regular)]")}
        >
          {card.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
