import { Box } from "@/components/ui/Box";
import { IntroCopy } from "./IntroCopy";
import { IntroHeadline } from "./IntroHeadline";

export function IntroSection() {
  return (
    <Box as="section" aria-labelledby="intro-heading" className="relative py-16 md:py-20 lg:py-[120px]">
      <IntroHeadline />
      <IntroCopy />
    </Box>
  );
}
