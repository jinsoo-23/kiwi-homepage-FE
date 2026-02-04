import Image from "next/image";
import { cn } from "@/lib/utils";

type PreviewImageProps = {
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

/**
 * 키위 플랫폼 미리보기 이미지 (대용량 SVG는 파일 참조)
 */
export function PreviewImage({
  alt = "키위 플랫폼 미리보기",
  className,
  width = 1046,
  height = 680,
}: PreviewImageProps) {
  return (
    <Image
      src="/preview.svg"
      alt={alt}
      width={width}
      height={height}
      className={cn("w-[65%] aspect-ratio-[523/340]", className)}
    />
  );
}
