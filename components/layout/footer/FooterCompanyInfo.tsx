import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LinusLogo } from "@/components/ui/LinusLogo";
import { Stack } from "@/components/ui/Stack";

export async function FooterCompanyInfo() {
  const t = await getTranslations("footer");

  return (
    <Stack direction="column" gap={4} className="text-left">
      <LinusLogo width={80} height={40} alt="linus" />
      <Link href="/admin" className="font-extrabold hover:opacity-80">
        {t("companyName")}
      </Link>
      <div className="flex flex-col gap-2">
        <p className="leading-relaxed whitespace-pre-line md:whitespace-normal">
          {t("address")}
        </p>
        <p>
          <a href="tel:02-6012-4555" className="hover:underline">
            02-6012-4555
          </a>
        </p>
        <p>
          <a href="mailto:info@linus.kr" className="hover:underline">
            info@linus.kr
          </a>
        </p>
      </div>
    </Stack>
  );
}
