import Link from "next/link";
import { Stack } from "@/components/ui/Stack";

export function FooterLegal() {
  return (
    <Stack direction="column" gap={1} className="md:text-right">
      <Link href="/privacy" className="underline hover:opacity-90">
        개인정보처리방침
      </Link>
      <p>Copyright 2026. Linus. All rights reserved.</p>
    </Stack>
  );
}
