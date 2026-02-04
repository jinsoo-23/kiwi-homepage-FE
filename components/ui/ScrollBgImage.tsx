import { useId } from "react";
import { cn } from "@/lib/utils";
import { SCROLL_BG_DATA_URL } from "@/lib/scrollBgData";

type ScrollBgImageProps = {
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  /** true면 div + background-image로 영역을 꽉 채움 (배경 표시 확실) */
  cover?: boolean;
};

/**
 * 스크롤 배경 이미지 (인라인 SVG + base64 데이터)
 */
export function ScrollBgImage({
  alt = "",
  className,
  width = 1920,
  height = 1554,
  cover = false,
}: ScrollBgImageProps) {
  const id = useId().replace(/:/g, "");
  const patternId = `scrollbg-pattern-${id}`;
  const imageId = `scrollbg-image-${id}`;

  if (cover) {
    return (
      <div
        className={cn(
          "absolute inset-0 h-full w-full min-h-full min-w-full overflow-hidden bg-muted",
          className
        )}
      >
        {SCROLL_BG_DATA_URL && (
          <img
            src={SCROLL_BG_DATA_URL}
            alt={alt}
            className="absolute inset-0 h-full min-h-full w-full min-w-full object-cover object-center"
            decoding="async"
            role={alt ? "img" : "presentation"}
            aria-hidden={!alt}
          />
        )}
      </div>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1920 1554"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={cn("shrink-0", className)}
      aria-hidden={!alt}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
    >
      <rect width="1920" height="1554" fill={`url(#${patternId})`} />
      <defs>
        <pattern
          id={patternId}
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref={`#${imageId}`}
            transform="matrix(0.000393446 0 0 0.000486111 -0.0459201 0)"
          />
        </pattern>
        <image
          id={imageId}
          width="3200"
          height="2400"
          preserveAspectRatio="none"
          xlinkHref={SCROLL_BG_DATA_URL}
        />
      </defs>
    </svg>
  );
}
