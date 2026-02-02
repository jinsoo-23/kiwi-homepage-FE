import { Button } from "@/components/ui/Button";
import { Stack } from "@/components/ui/Stack";

export function HeroCTAButtons() {
  return (
    <Stack direction="row" gap={3} align="center" justify="center">
      <Button
        className="w-[108px] px-4 py-2 rounded-[100px] bg-linus-green text-white hover:bg-linus-dark-green"
      >
        더 알아보기
      </Button>
      <Button
        variant="outline"
        className="w-[108px] px-4 py-2 rounded-[100px] bg-white text-linus-green border-linus-green hover:bg-linus-mist-green hover:text-linus-dark-green hover:border-linus-dark-green"
      >
        소개서 다운로드
      </Button>
    </Stack>
  );
}
