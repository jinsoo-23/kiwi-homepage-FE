import { PartnerIcon } from "@/components/ui/PartnerIcon";
import { PartnerLogoCard } from "@/components/ui/PartnerLogoCard";
import type { PartnerCard as PartnerCardType } from "@/lib/data/partners";
import { Box } from "@/components/ui/Box";
import { Center } from "@/components/ui/Center";
import { Stack } from "@/components/ui/Stack";
import { cn } from "@/lib/utils";

type PartnerCardProps = {
  card: PartnerCardType;
  /** 번역된 title */
  title: string;
  /** 번역된 description */
  description: string;
  /** 번역된 descriptionHighlight (선택) */
  descriptionHighlight?: string;
  /** "더 알아보기" 버튼 노출 여부 */
  showLearnMoreButton?: boolean;
  /** 버튼 클릭 시 이동할 URL (있으면 링크로 렌더) */
  learnMoreHref?: string;
  /** "더 알아보기" 버튼 텍스트 (다국어 지원용) */
  learnMoreLabel?: string;
  /** true일 때만 하단 설명(description) 영역 노출 (기본: false) */
  showDescription?: boolean;
  /** 로고 카드 영역에 적용할 className (배경색, padding 등) */
  logoCardClassName?: string;
  /** 로고/콘텐츠 영역 가로 정렬 (기본: center) */
  contentJustify?: "start" | "center" | "end";
};

export function PartnerCard({
  card,
  title,
  description,
  descriptionHighlight,
  showLearnMoreButton = false,
  learnMoreHref,
  learnMoreLabel,
  showDescription = false,
  logoCardClassName,
  contentJustify,
}: PartnerCardProps) {
  return (
    <Stack className="h-full">
      <PartnerLogoCard
        showLearnMoreButton={showLearnMoreButton}
        learnMoreHref={learnMoreHref}
        learnMoreLabel={learnMoreLabel}
        className={cn(logoCardClassName, showDescription && "h-[200px]")}
        contentJustify={contentJustify}
      >
        <Center
          className={cn(
            "relative w-full",
            card.logoSize === "large"
              ? "max-w-[200px] h-16"
              : "max-w-[140px] h-12"
          )}
        >
          <PartnerIcon
            icon={card.id}
            alt={title}
            width={card.logoSize === "large" ? 200 : 140}
            height={card.logoSize === "large" ? 64 : 48}
          />
        </Center>
      </PartnerLogoCard>
      {showDescription && (
        <Box className="flex-1 py-5 text-left">
          <p className="font-[var(--font-pretendard)] text-[20px] font-semibold leading-[140%] not-italic text-label-alternative">
            <span className="font-extrabold text-label-regular">{title}</span>{" "}
            {(() => {
              if (!descriptionHighlight || !description.includes(descriptionHighlight)) {
                return description;
              }
              const [before, after] = description.split(descriptionHighlight);
              return (
                <>
                  {before}
                  <span className="font-extrabold text-linus-service">
                    {descriptionHighlight}
                  </span>
                  {after}
                </>
              );
            })()}
          </p>
        </Box>
      )}
    </Stack>
  );
}
