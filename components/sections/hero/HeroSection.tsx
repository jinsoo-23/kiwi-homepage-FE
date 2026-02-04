import Image from "next/image";
import { Box } from "@/components/ui/Box";
import { Stack } from "@/components/ui/Stack";
import { KiwiLogo } from "@/components/ui/KiwiLogo";
import { HeroCTAButtons } from "./HeroCTAButtons";

function HeroLogo() {
  return (
    <KiwiLogo
      width={334}
      height={100}
      className="w-[200px] h-[60px] md:w-[280px] md:h-[84px] lg:w-[334px] lg:h-[100px]"
    />
  );
}

function HeroTagline() {
  return (
    <h1 className="font-bold text-base md:text-xl lg:text-[24px] text-center px-4">
      Next-Generation Learning Experience Platform
    </h1>
  );
}

function HeroPreview() {
  return (
    <Image
      src="/preview.svg"
      alt="키위 플랫폼 미리보기"
      className="w-[90%] md:w-[75%] lg:w-[65%] aspect-ratio-[523/340]"
      width={1046}
      height={680}
    />
  );
}

export function HeroSection() {
  return (
    <Box
      as="section"
      aria-label="메인 비주얼"
      className="min-h-screen w-full max-w-[1920px] mx-auto bg-linus-hero-gradient flex items-center justify-center px-4 py-20 md:py-0"
    >
      <Stack gap={6} align="center" justify="center" className="md:gap-10">
        <Stack
          gap={4}
          align="center"
          justify="center"
          className="md:gap-6"
        >
          <HeroLogo />
          <HeroTagline />
        </Stack>
        <HeroCTAButtons />
        <HeroPreview />
      </Stack>
    </Box>
  );
}
