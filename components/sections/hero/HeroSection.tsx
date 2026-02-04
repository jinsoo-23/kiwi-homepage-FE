import Image from "next/image";
import { Box } from "@/components/ui/Box";
import { Stack } from "@/components/ui/Stack";
import { KiwiLogo } from "@/components/ui/KiwiLogo";
import { HeroCTAButtons } from "./HeroCTAButtons";

function HeroLogo() {
  return <KiwiLogo width={334} height={100} />;
}

function HeroTagline() {
  return (
    <h1 className="font-bold text-[24px]">
      Next-Generation Learning Experience Platform
    </h1>
  );
}

function HeroPreview() {
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

export function HeroSection() {
  return (
    <Box
      as="section"
      aria-label="메인 비주얼"
      className="min-h-screen w-full max-w-[1920px] mx-auto bg-linus-hero-gradient flex items-center justify-center"
    >
      <Stack gap={10} align="center" justify="center">
        <Stack
          gap={6}
          align="center"
          justify="center"
          className="font-bold text-[24px]"
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
