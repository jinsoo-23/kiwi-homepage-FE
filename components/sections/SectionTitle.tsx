import { KiwiLogo } from "@/components/ui/KiwiLogo";
import { Stack } from "@/components/ui/Stack";

type SectionTitleProps = {
  id?: string;
  title: string;
  /** Stack 정렬 (기본: center) */
  justify?: "start" | "center" | "end" | "between";
};

export function SectionTitle({ id, title, justify = "center" }: SectionTitleProps) {
  return (
    <h2 id={id} className="text-[40px] font-bold">
      <Stack direction="row" gap={2} align="center" justify={justify}>
        <KiwiLogo width={120} height={36} alt="" />
        <span>{title}</span>
      </Stack>
    </h2>
  );
}
