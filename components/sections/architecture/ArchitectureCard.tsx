import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type ArchitectureCardProps = {
  title: string;
  description: string;
  cardClassName?: string;
  titleClassName?: string;
};

export function ArchitectureCard({
  title,
  description,
  cardClassName,
  titleClassName,
}: ArchitectureCardProps) {
  return (
    <Card className={cn("h-full text-center", cardClassName)}>
      <CardHeader className="pb-2">
        <CardTitle className={titleClassName}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className={cn("text-[20px] text-label-regular whitespace-pre-line")}>
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
