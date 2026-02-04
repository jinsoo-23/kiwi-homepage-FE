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
    <h1 className="font-bold text-[20px] md:text-xl lg:text-[24px] text-center px-7">
      차세대 학습경험플랫폼
    </h1>
  );
}

function HeroPreview() {
  return (
    <div className="w-screen -mx-7 overflow-hidden md:w-full md:mx-0 md:overflow-visible md:flex md:justify-center">
      <Image
        src="/preview.svg"
        alt="키위 플랫폼 미리보기"
        className="w-[140%] -ml-[30%] md:w-[75%] md:ml-0 lg:w-[65%] aspect-ratio-[523/340]"
        width={1046}
        height={680}
      />
    </div>
  );
}

export function HeroSection() {
  return (
    <Box
      as="section"
      aria-label="메인 비주얼"
      className="min-h-[60vh] w-full max-w-[1920px] mx-auto bg-linus-hero-gradient flex items-center justify-center px-7 py-16 md:min-h-screen md:py-0"
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
