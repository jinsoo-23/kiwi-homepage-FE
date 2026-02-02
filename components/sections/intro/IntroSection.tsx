import { Box } from "@/components/ui/Box";
import { IntroCopy } from "./IntroCopy";
import { IntroHeadline } from "./IntroHeadline";

export function IntroSection() {
  return (
    <Box as="section" aria-labelledby="intro-heading">
      <IntroHeadline />
      <IntroCopy />
    </Box>
  );
}
