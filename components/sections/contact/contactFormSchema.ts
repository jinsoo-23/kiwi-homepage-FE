import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "이름을 입력해 주세요."),
  companyName: z.string().min(1, "기업/기관명을 입력해 주세요."),
  email: z
    .string()
    .min(1, "기업/기관 메일을 입력해 주세요.")
    .pipe(z.email({ message: "올바른 이메일 형식이 아닙니다." })),
  countryCode: z.string().min(1),
  phone: z
    .string()
    .min(1, "휴대폰 번호를 입력해 주세요.")
    .regex(/^[\d-]+$/, { message: "숫자와 하이픈만 입력 가능합니다." }),
  inquiryType: z.string().min(1, "문의 구분을 선택해 주세요."),
  message: z.string().min(1, "문의 내용을 입력해 주세요."),
  privacyConsent: z.literal(true, {
    message: "개인정보 수집에 동의해 주세요.",
  }),
  marketingConsent: z.boolean().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
