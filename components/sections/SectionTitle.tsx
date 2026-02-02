import { KiwiLogo } from "@/components/ui/KiwiLogo";
import { Stack } from "@/components/ui/Stack";

type SectionTitleProps = {
  id?: string;
  children: React.ReactNode;
};

export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2 id={id} className="text-[40px] font-bold">
      <Stack direction="row" gap={2} align="center" justify="center">
        <KiwiLogo width={120} height={36} alt="" />
        <span>{children}</span>
      </Stack>
    </h2>
  );
}
