import { Box } from "@/components/ui/Box";
import { cn } from "@/lib/utils";
import { sectionAlt } from "@/lib/uiPatterns";

type SectionAltProps = {
  children?: React.ReactNode;
  /** section 요소의 aria-label (접근성) */
  "aria-label"?: string;
  /** section 요소의 aria-labelledby */
  "aria-labelledby"?: string;
  className?: string;
};

/**
 * 풀 너비 회색 배경 섹션 래퍼 (아키텍처·든든한 동료들 등 동일 스타일)
 */
export function SectionAlt({
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
}: SectionAltProps) {
  return (
    <Box
      as="section"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(sectionAlt, className)}
    >
      {children}
    </Box>
  );
}
