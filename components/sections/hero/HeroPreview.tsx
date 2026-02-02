import Image from "next/image";

export function HeroPreview() {
  return (
    <Image
      src="/preview.svg"
      alt="키위 플랫폼 미리보기"
      className="w-[65%] aspect-ratio-[523/340]"
      width={1046}
      height={680}
    />
  );
}
