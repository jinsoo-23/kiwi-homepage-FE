import { Box } from "@/components/ui/Box";
import { Stack } from "@/components/ui/Stack";
import { HeroCTAButtons } from "./HeroCTAButtons";
import { HeroLogo } from "./HeroLogo";
import { HeroPreview } from "./HeroPreview";
import { HeroTagline } from "./HeroTagline";

export function HeroSection() {
  return (
    <Box
      as="section"
      aria-label="메인 비주얼"
      className="min-h-screen w-full max-w-[1920px] mx-auto bg-[image:var(--linus-hero-gradient)] flex items-center justify-center"
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
