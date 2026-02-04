import { z } from "zod";

export const contactFormSchema = z.object({
  email: z
    .string()
    .min(1, "기업/기관 메일을 입력해 주세요.")
    .pipe(z.email({ message: "올바른 이메일 형식이 아닙니다." })),
  countryCode: z.string().min(1),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, "문의 구분을 선택해 주세요."),
  message: z.string().optional(),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "개인정보 수집에 동의해 주세요." }),
  }),
  marketingConsent: z.boolean().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
