import { PartnerIcon } from "@/components/ui/PartnerIcon";
import type { PartnerCard as PartnerCardType } from "@/lib/data/partners";
import { Box } from "@/components/ui/Box";
import { Center } from "@/components/ui/Center";
import { Stack } from "@/components/ui/Stack";

type PartnerCardProps = {
  card: PartnerCardType;
};

export function PartnerCard({ card }: PartnerCardProps) {
  return (
    <Stack className="overflow-hidden h-full">
      <Center className="bg-white p-8 min-h-[140px] flex-shrink-0 rounded-t-[12px]">
        <Center className="relative w-full max-w-[140px] h-12">
          <PartnerIcon icon={card.icon} alt={card.title} width={140} height={48} />
        </Center>
      </Center>
      <Box className="flex-1 px-6 py-5 text-left">
        <p
          className="font-[var(--font-pretendard)] text-[20px] font-semibold leading-[140%] not-italic"
style={{ color: "var(--semantic-label-alternative)" }}
        >
          <span
            className="font-extrabold"
            style={{ color: "var(--semantic-label-regular)" }}
          >
            {card.title}
          </span>{" "}
          {card.description}
        </p>
      </Box>
    </Stack>
  );
}
