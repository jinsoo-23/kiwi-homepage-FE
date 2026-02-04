import { paths } from "@/lib/paths";
import { heroCta } from "@/lib/ui-patterns";

export function BrochureDownloadLink() {
  return (
    <a
      href={paths.brochure.href}
      download={paths.brochure.download}
      className={heroCta.brochure}
    >
      소개서 다운로드
    </a>
  );
}
