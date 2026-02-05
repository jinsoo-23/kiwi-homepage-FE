import { KiwiLogo } from "@/components/ui/KiwiLogo";

type SectionTitleProps = {
  id?: string;
  /** 로고 바로 뒤에 붙는 텍스트 (예: "의", "와") */
  particle?: string;
  /** 메인 타이틀 텍스트 */
  title: React.ReactNode;
  /** 정렬 (기본: center) */
  align?: "left" | "center" | "right";
  /** 데스크탑(md 이상) 정렬 - 지정하지 않으면 align 값 사용 */
  mdAlign?: "left" | "center" | "right";
  /** 모바일에서 두 줄로 표시 (기본: false) */
  mobileBreak?: boolean;
};

export function SectionTitle({
  id,
  particle = "의",
  title,
  align = "center",
  mdAlign,
  mobileBreak = false,
}: SectionTitleProps) {
  const alignClassMap = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const mdAlignClassMap = {
    left: "md:justify-start",
    center: "md:justify-center",
    right: "md:justify-end",
  };

  const alignClass = alignClassMap[align];
  const mdAlignClass = mdAlign ? mdAlignClassMap[mdAlign] : "";

  const flexClass = mobileBreak
    ? "flex flex-col md:flex-row md:flex-wrap"
    : "flex flex-row flex-wrap";

  return (
    <h2 id={id} className={`text-[32px] md:text-[32px] lg:text-[40px] font-bold w-full ${flexClass} items-center gap-2 ${alignClass} ${mdAlignClass}`}>
      <span className="inline-flex items-center whitespace-nowrap">
        <KiwiLogo
          width={120}
          height={36}
          className="w-[90px] h-[27px] md:w-[100px] md:h-[30px] lg:w-[120px] lg:h-[36px]"
          alt=""
        />
        <span>{particle}</span>
      </span>
      <span>{title}</span>
    </h2>
  );
}
