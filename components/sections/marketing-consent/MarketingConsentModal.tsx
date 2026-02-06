"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import { marketingConsentSchema, type MarketingConsentFormValues } from "./marketingConsentSchema";
import { Button } from "@/components/ui/Button";
import { updateMarketingConsent, ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-lg border border-[var(--color-input)] bg-background px-4 py-3 text-sm text-label-regular placeholder:text-label-disable focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-0";

type SubmitStatus = "idle" | "success" | "error";

interface MarketingConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MarketingConsentModal({ open, onOpenChange }: MarketingConsentModalProps) {
  const t = useTranslations("marketingConsentModal");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MarketingConsentFormValues>({
    resolver: zodResolver(marketingConsentSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: MarketingConsentFormValues) => {
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      await updateMarketingConsent({
        email: data.email,
        phone: data.phone.replace(/-/g, ""),
      });

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      if (error instanceof ApiError) {
        if (error.errorCode === "INQUIRY_NOT_FOUND") {
          setErrorMessage(t("notFound"));
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage(t("error"));
      }
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSubmitStatus("idle");
      setErrorMessage("");
      reset();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <Dialog.Title className="text-lg font-bold text-label-regular">{t("title")}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-label-assistive">
            {t("description")}
          </Dialog.Description>

          {submitStatus === "success" ? (
            <div className="mt-6">
              <div
                className="rounded-lg bg-green-50 p-4 text-sm text-green-800"
                role="alert"
                aria-live="polite"
              >
                {t("success")}
              </div>
              <Button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="mt-4 w-full rounded-lg bg-linus-primary py-3 text-sm font-semibold text-linus-white hover:bg-linus-primary-hover"
              >
                {t("close")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
              {submitStatus === "error" && (
                <div
                  className="rounded-lg bg-red-50 p-4 text-sm text-red-800"
                  role="alert"
                  aria-live="polite"
                >
                  {errorMessage}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="marketing-email" className="text-sm font-semibold text-label-regular">
                  {t("email.label")} <span className="text-linus-primary">*</span>
                </label>
                <input
                  id="marketing-email"
                  type="email"
                  placeholder={t("email.placeholder")}
                  className={cn(inputBase, errors.email && "border-destructive")}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "marketing-email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="marketing-email-error" className="text-xs text-destructive" role="alert">
                    {t("email.invalid")}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="marketing-phone" className="text-sm font-semibold text-label-regular">
                  {t("phone.label")} <span className="text-linus-primary">*</span>
                </label>
                <input
                  id="marketing-phone"
                  type="tel"
                  placeholder={t("phone.placeholder")}
                  className={cn(inputBase, errors.phone && "border-destructive")}
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "marketing-phone-error" : undefined}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p id="marketing-phone-error" className="text-xs text-destructive" role="alert">
                    {t("phone.invalid")}
                  </p>
                )}
              </div>

              <div className="mt-2 flex gap-3">
                <Dialog.Close asChild>
                  <Button
                    type="button"
                    className="flex-1 rounded-lg border border-[var(--color-border)] bg-white py-3 text-sm font-semibold text-label-regular hover:bg-gray-50"
                  >
                    {t("cancel")}
                  </Button>
                </Dialog.Close>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-linus-primary py-3 text-sm font-semibold text-linus-white hover:bg-linus-primary-hover disabled:opacity-50"
                >
                  {isSubmitting ? t("submitting") : t("submit")}
                </Button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
