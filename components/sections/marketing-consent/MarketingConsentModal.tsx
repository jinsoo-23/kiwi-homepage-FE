"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import { marketingConsentSchema, type MarketingConsentFormValues } from "./marketingConsentSchema";
import { Button } from "@/components/ui/Button";
import { getConsents, updateConsent, ApiError, type ConsentStatus } from "@/lib/api";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-lg border border-[var(--color-input)] bg-background px-4 py-3 text-sm text-label-regular placeholder:text-label-disable focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-0";

type ModalStep = "verify" | "manage" | "success";

interface MarketingConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MarketingConsentModal({ open, onOpenChange }: MarketingConsentModalProps) {
  const t = useTranslations("marketingConsentModal");
  const [step, setStep] = useState<ModalStep>("verify");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [consents, setConsents] = useState<ConsentStatus[]>([]);
  const [pendingMarketingConsent, setPendingMarketingConsent] = useState<boolean | null>(null);
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");
  const [verifiedPhone, setVerifiedPhone] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

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

  const onVerify = async (data: MarketingConsentFormValues) => {
    setErrorMessage("");
    const phone = data.phone.replace(/-/g, "");

    try {
      const response = await getConsents(data.email, phone);
      setConsents(response.consents);
      const marketingConsent = response.consents.find((c) => c.consentType === "MARKETING");
      setPendingMarketingConsent(marketingConsent?.consented ?? false);
      setVerifiedEmail(data.email);
      setVerifiedPhone(phone);
      setStep("manage");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.errorCode === "CUSTOMER_NOT_FOUND") {
          setErrorMessage(t("notFound"));
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage(t("error"));
      }
    }
  };

  const onToggleConsent = (newValue: boolean) => {
    setPendingMarketingConsent(newValue);
  };

  const onSave = async () => {
    const currentConsent = getMarketingConsent()?.consented ?? false;

    // 변경사항이 없으면 저장하지 않음
    if (pendingMarketingConsent === currentConsent) {
      handleOpenChange(false);
      return;
    }

    setIsUpdating(true);
    setErrorMessage("");

    try {
      const response = await updateConsent({
        email: verifiedEmail,
        phone: verifiedPhone,
        consentType: "MARKETING",
        consented: pendingMarketingConsent!,
      });

      setConsents((prev) =>
        prev.map((c) =>
          c.consentType === "MARKETING"
            ? { ...c, consented: response.consented, updatedAt: response.updatedAt }
            : c
        )
      );
      setStep("success");
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(t("error"));
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setStep("verify");
      setErrorMessage("");
      setConsents([]);
      setPendingMarketingConsent(null);
      setVerifiedEmail("");
      setVerifiedPhone("");
      reset();
    }
    onOpenChange(isOpen);
  };

  const getMarketingConsent = () => consents.find((c) => c.consentType === "MARKETING");

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <Dialog.Title className="text-lg font-bold text-label-regular">{t("title")}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-label-assistive">
            {step === "verify" ? t("description") : t("manageDescription")}
          </Dialog.Description>

          {step === "success" ? (
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
          ) : step === "manage" ? (
            <div className="mt-6 flex flex-col gap-4">
              {errorMessage && (
                <div
                  className="rounded-lg bg-red-50 p-4 text-sm text-red-800"
                  role="alert"
                  aria-live="polite"
                >
                  {errorMessage}
                </div>
              )}

              <div className="rounded-lg border border-[var(--color-border)] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-label-regular">
                      {t("marketingConsentLabel")}
                    </p>
                    <p className="mt-1 text-xs text-label-assistive">
                      {pendingMarketingConsent ? t("currentlyEnabled") : t("currentlyDisabled")}
                    </p>
                  </div>
                  <Switch.Root
                    checked={pendingMarketingConsent ?? false}
                    onCheckedChange={onToggleConsent}
                    disabled={isUpdating}
                    className="relative h-6 w-11 cursor-pointer rounded-full bg-gray-200 transition-colors data-[state=checked]:bg-linus-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-lg transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  disabled={isUpdating}
                  className="flex-1 rounded-lg border border-[var(--color-border)] bg-white py-3 text-sm font-semibold text-label-regular hover:bg-gray-50 disabled:opacity-50"
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="button"
                  onClick={onSave}
                  disabled={isUpdating}
                  className="flex-1 rounded-lg bg-linus-primary py-3 text-sm font-semibold text-linus-white hover:bg-linus-primary-hover disabled:opacity-50"
                >
                  {isUpdating ? t("saving") : t("save")}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onVerify)} className="mt-6 flex flex-col gap-4">
              {errorMessage && (
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
                  {isSubmitting ? t("verifying") : t("verify")}
                </Button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
