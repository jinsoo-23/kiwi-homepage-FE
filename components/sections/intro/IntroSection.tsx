import { Box } from "@/components/ui/Box";
import { IntroCopy } from "./IntroCopy";
import { IntroHeadline } from "./IntroHeadline";

export function IntroSection() {
  return (
    <Box as="section" aria-labelledby="intro-heading" className="relative pt-16 pb-[150px] md:py-20 lg:py-[120px] flex flex-col gap-8">
      <IntroHeadline />
      <IntroCopy />
    </Box>
  );
}
