import { z } from "zod";

export const marketingConsentSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .pipe(z.email({ message: "올바른 이메일 형식이 아닙니다." })),
  phone: z
    .string()
    .min(1, "휴대폰 번호를 입력해 주세요.")
    .regex(/^[\d-]+$/, { message: "숫자와 하이픈만 입력 가능합니다." }),
});

export type MarketingConsentFormValues = z.infer<typeof marketingConsentSchema>;
