import { Stack } from "@/components/ui/Stack";
import { BrochureDownloadLink } from "./BrochureDownloadLink";
import { ScrollToMainButton } from "./ScrollToMainButton";

export function HeroCTAButtons() {
  return (
    <Stack direction="row" gap={3} align="center" justify="center">
      <ScrollToMainButton />
      <BrochureDownloadLink />
    </Stack>
  );
}
