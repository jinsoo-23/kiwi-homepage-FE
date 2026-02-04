import { Box } from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const contentJustifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
} as const;

type PartnerLogoCardProps = {
  children: React.ReactNode;
  /** "더 알아보기" 버튼 노출 여부 */
  showLearnMoreButton?: boolean;
  /** 버튼 클릭 시 이동할 URL (있으면 링크, 없으면 버튼만) */
  learnMoreHref?: string;
  /** 로고/콘텐츠 영역 가로 정렬 (기본: center) */
  contentJustify?: keyof typeof contentJustifyMap;
  className?: string;
};

export function PartnerLogoCard({
  children,
  showLearnMoreButton = false,
  learnMoreHref,
  contentJustify = "center",
  className,
}: PartnerLogoCardProps) {
  const learnMoreButton = showLearnMoreButton && (
    learnMoreHref ? (
      <a
        href={learnMoreHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--color-border)] px-8 py-2 text-sm font-medium text-label-alternative transition-colors hover:bg-[var(--color-border)]/80"
      >
        더 알아보기
      </a>
    ) : (
      <Button
        variant="secondary"
        size="sm"
        type="button"
        className="shrink-0 rounded-full bg-[var(--color-border)] px-8 py-2 text-label-alternative hover:bg-[var(--color-border)]/80"
      >
        더 알아보기
      </Button>
    )
  );

  return (
    <Box
      className={cn(
        "bg-white p-8 flex-shrink-0 rounded-[12px]",
        showLearnMoreButton && "flex items-center justify-between gap-4",
        !showLearnMoreButton && "flex items-center justify-center",
        className
      )}
    >
      <Box
        className={cn(
          "flex min-w-0 flex-1 items-center",
          contentJustifyMap[contentJustify]
        )}
      >
        {children}
      </Box>
      {learnMoreButton}
    </Box>
  );
}
