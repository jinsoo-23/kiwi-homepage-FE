"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "./contact-form-schema";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { COUNTRY_CODES } from "@/lib/data/country-codes";
import { cn } from "@/lib/utils";

const INQUIRY_TYPES = [
  { value: "kiwi", label: "Kiwi 도입 문의" },
  { value: "kiwi-feature", label: "Kiwi 기능 문의" },
  { value: "kiwi-partnership", label: "Kiwi 파트너십 문의" },
] as const;

const inputBase =
  "w-full rounded-lg border border-[var(--color-input)] bg-background px-4 py-3 text-sm text-label-regular placeholder:text-label-disable focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-0";

export function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      countryCode: "+82",
      inquiryType: "kiwi",
      marketingConsent: false,
    },
  });

  const email = watch("email");
  const inquiryType = watch("inquiryType");
  const message = watch("message");
  const privacyConsent = watch("privacyConsent");

  const isFormFilled =
    !!email?.trim() &&
    !!inquiryType?.trim() &&
    !!message?.trim() &&
    privacyConsent === true;

  const onSubmit = (data: ContactFormValues) => {
    // TODO: API 연동
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]"
      aria-label="문의 폼"
    >
      <h3 className="sr-only">문의 폼</h3>

      {/* 기업/기관 메일 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-semibold text-label-regular">
          기업/기관 메일 <span className="text-linus-primary">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="linus@university.ac.kr"
          className={cn(inputBase, errors.email && "border-destructive")}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* 휴대폰 번호 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-phone" className="text-sm font-semibold text-label-regular">
          휴대폰 번호
        </label>
        <div className="flex gap-2">
          <Controller
            name="countryCode"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                onOpenChange={(open) => !open && field.onBlur()}
              >
                <SelectTrigger
                  id="contact-country-code"
                  className={cn(
                    inputBase,
                    "!h-[46px] w-[120px] shrink-0 py-3 font-medium text-label-regular [&_svg]:size-[18px]"
                  )}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className="max-h-[min(var(--radix-select-content-available-height),280px)] rounded-lg border-[var(--color-input)] bg-white py-1 shadow-[var(--shadow-card)]"
                  position="popper"
                  align="start"
                >
                  {COUNTRY_CODES.map(({ value, label, flag }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium text-label-regular focus:bg-[var(--fill-normal)] focus:text-label-regular data-[highlighted]:bg-[var(--fill-normal)] data-[highlighted]:text-label-regular"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[1.25rem] leading-none">{flag}</span>
                        <span>{label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <input
            id="contact-phone"
            type="tel"
            placeholder="01012341234"
            className={cn(inputBase, "h-[46px]", errors.phone && "border-destructive")}
            {...register("phone")}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-destructive" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* 문의 구분 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-inquiry-type" className="text-sm font-semibold text-label-regular">
          문의 구분
        </label>
        <Controller
          name="inquiryType"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              onOpenChange={(open) => !open && field.onBlur()}
            >
              <SelectTrigger
                id="contact-inquiry-type"
                className={cn(
                  inputBase,
                  "!h-[46px] cursor-pointer py-3 font-medium text-label-regular [&_svg]:size-[18px]",
                  errors.inquiryType && "border-destructive"
                )}
              >
                <SelectValue placeholder="문의 구분을 선택하세요" />
              </SelectTrigger>
              <SelectContent
                className="max-h-[min(var(--radix-select-content-available-height),280px)] rounded-lg border-[var(--color-input)] bg-white py-1 shadow-[var(--shadow-card)]"
                position="popper"
                align="start"
              >
                {INQUIRY_TYPES.map(({ value, label }) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className="cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium text-label-regular focus:bg-[var(--fill-normal)] focus:text-label-regular data-[highlighted]:bg-[var(--fill-normal)] data-[highlighted]:text-label-regular"
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.inquiryType && (
          <p className="text-xs text-destructive" role="alert">
            {errors.inquiryType.message}
          </p>
        )}
      </div>

      {/* 문의 내용 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-label-regular">
          문의 내용
        </label>
        <textarea
          id="contact-message"
          rows={8}
          placeholder="궁금한 내용을 편하게 알려주세요"
          className={cn(inputBase, "resize-none", errors.message && "border-destructive")}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* [필수] 개인정보 수집 동의 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <input
            id="contact-privacy"
            type="checkbox"
            className="contact-checkbox mt-1"
            {...register("privacyConsent")}
          />
          <label htmlFor="contact-privacy" className="text-sm font-semibold text-label-regular">
            [필수] <span className="underline">개인정보 수집 동의</span>
          </label>
        </div>
        {errors.privacyConsent && (
          <p className="text-xs text-destructive" role="alert">
            {errors.privacyConsent.message}
          </p>
        )}
      </div>

      {/* [선택] 이벤트/프로모션 알림 수신 동의 */}
      <div className="flex items-start gap-2">
        <input
          id="contact-marketing"
          type="checkbox"
          className="contact-checkbox mt-1"
          {...register("marketingConsent")}
        />
        <label htmlFor="contact-marketing" className="text-sm font-semibold text-label-regular">
          [선택] <span className="underline">이벤트/프로모션 알림 수신 동의</span>
        </label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !isFormFilled}
        className="w-full rounded-[100px] bg-linus-primary py-5 text-[18px] font-extrabold text-white hover:bg-linus-primary-hover disabled:opacity-50 mt-3"
      >
        제출
      </Button>
    </form>
  );
}
