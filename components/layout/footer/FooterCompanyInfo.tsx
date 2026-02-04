import { LinusLogo } from "@/components/ui/LinusLogo";
import { Stack } from "@/components/ui/Stack";

export function FooterCompanyInfo() {
  return (
    <Stack direction="column" gap={4} className="text-left">
      <LinusLogo width={80} height={40} alt="linus" />
      <p className="font-extrabold">주식회사 라이너스</p>
      <div className="flex flex-col gap-2">
        <p className="leading-relaxed">
          서울특별시 강남구 테헤란로2길 27, 강남비전타워 13층
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
