import { KiwiLogo } from "@/components/ui/KiwiLogo";

type HeroLogoProps = {
  width?: number;
  height?: number;
};

export function HeroLogo({ width = 334, height = 100 }: HeroLogoProps) {
  return <KiwiLogo width={width} height={height} />;
}
