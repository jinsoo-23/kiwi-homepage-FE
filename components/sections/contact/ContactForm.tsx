"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { contactFormSchema, type ContactFormValues } from "./contactFormSchema";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { COUNTRY_CODES } from "@/lib/data/countryCodes";
import { createInquiry, ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

const INQUIRY_TYPE_KEYS = ["kiwi", "kiwiFeature", "kiwiPartnership"] as const;

const inputBase =
  "w-full rounded-lg border border-[var(--color-input)] bg-background px-4 py-3 text-sm text-label-regular placeholder:text-label-disable focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-0";

type SubmitStatus = "idle" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      countryCode: "+82",
      phone: "",
      inquiryType: "kiwi",
      message: "",
      marketingConsent: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const phoneWithCountryCode = data.countryCode + data.phone.replace(/-/g, "");

      await createInquiry({
        name: data.name,
        companyName: data.companyName,
        email: data.email,
        phone: phoneWithCountryCode,
        inquiryType: data.inquiryType,
        message: data.message,
        marketingConsent: data.marketingConsent ?? false,
        privacyConsent: true,
      });

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(t("submitError"));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]"
      aria-label={t("formLabel")}
    >
      <h3 className="sr-only">{t("formLabel")}</h3>

      {submitStatus === "success" && (
        <div
          className="rounded-lg bg-green-50 p-4 text-sm text-green-800"
          role="alert"
          aria-live="polite"
        >
          {t("submitSuccess")}
        </div>
      )}

      {submitStatus === "error" && (
        <div
          className="rounded-lg bg-red-50 p-4 text-sm text-red-800"
          role="alert"
          aria-live="polite"
        >
          {errorMessage}
        </div>
      )}

      {/* 이름 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-semibold text-label-regular">
          {t("name.label")} <span className="text-linus-primary">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder={t("name.placeholder")}
          className={cn(inputBase, errors.name && "border-destructive")}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-xs text-destructive" role="alert">
            {t("name.required")}
          </p>
        )}
      </div>

      {/* 기업/기관명 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-company-name" className="text-sm font-semibold text-label-regular">
          {t("companyName.label")} <span className="text-linus-primary">*</span>
        </label>
        <input
          id="contact-company-name"
          type="text"
          placeholder={t("companyName.placeholder")}
          className={cn(inputBase, errors.companyName && "border-destructive")}
          aria-required="true"
          aria-invalid={!!errors.companyName}
          aria-describedby={errors.companyName ? "contact-company-name-error" : undefined}
          {...register("companyName")}
        />
        {errors.companyName && (
          <p id="contact-company-name-error" className="text-xs text-destructive" role="alert">
            {t("companyName.required")}
          </p>
        )}
      </div>

      {/* 기업/기관 메일 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-semibold text-label-regular">
          {t("email.label")} <span className="text-linus-primary">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder={t("email.placeholder")}
          className={cn(inputBase, errors.email && "border-destructive")}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs text-destructive" role="alert">
            {t("email.invalid")}
          </p>
        )}
      </div>

      {/* 휴대폰 번호 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-phone" className="text-sm font-semibold text-label-regular">
          {t("phone.label")} <span className="text-linus-primary">*</span>
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
            placeholder={t("phone.placeholder")}
            className={cn(inputBase, "h-[46px]", errors.phone && "border-destructive")}
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            {...register("phone")}
          />
        </div>
        {errors.phone && (
          <p id="contact-phone-error" className="text-xs text-destructive" role="alert">
            {t("phone.invalid")}
          </p>
        )}
      </div>

      {/* 문의 구분 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-inquiry-type" className="text-sm font-semibold text-label-regular">
          {t("inquiryType.label")} <span className="text-linus-primary">*</span>
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
                aria-invalid={!!errors.inquiryType}
                aria-describedby={errors.inquiryType ? "contact-inquiry-type-error" : undefined}
              >
                <SelectValue placeholder={t("inquiryType.placeholder")} />
              </SelectTrigger>
              <SelectContent
                className="max-h-[min(var(--radix-select-content-available-height),280px)] rounded-lg border-[var(--color-input)] bg-white py-1 shadow-[var(--shadow-card)]"
                position="popper"
                align="start"
              >
                {INQUIRY_TYPE_KEYS.map((key) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="cursor-pointer rounded-md px-3 py-2.5 text-sm font-medium text-label-regular focus:bg-[var(--fill-normal)] focus:text-label-regular data-[highlighted]:bg-[var(--fill-normal)] data-[highlighted]:text-label-regular"
                  >
                    {t(`inquiryType.options.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.inquiryType && (
          <p id="contact-inquiry-type-error" className="text-xs text-destructive" role="alert">
            {errors.inquiryType.message}
          </p>
        )}
      </div>

      {/* 문의 내용 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-semibold text-label-regular">
          {t("inquiryDetails.label")} <span className="text-linus-primary">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={8}
          placeholder={t("inquiryDetails.placeholder")}
          className={cn(inputBase, "resize-none", errors.message && "border-destructive")}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-destructive" role="alert">
            {t("inquiryDetails.required")}
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
            aria-required="true"
            aria-invalid={!!errors.privacyConsent}
            aria-describedby={errors.privacyConsent ? "contact-privacy-error" : undefined}
            {...register("privacyConsent")}
          />
          <label htmlFor="contact-privacy" className="text-sm font-semibold text-label-regular">
            {t("privacyConsent.label")}
          </label>
        </div>
        {errors.privacyConsent && (
          <p id="contact-privacy-error" className="text-xs text-destructive" role="alert">
            {t("privacyConsent.required")}
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
          {t("marketingConsent.label")}
        </label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="mt-3 w-full rounded-[100px] bg-linus-primary py-5 text-[18px] font-extrabold text-linus-white hover:bg-linus-primary-hover disabled:opacity-50"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
