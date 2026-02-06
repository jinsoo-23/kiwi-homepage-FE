import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { getPrivacyPolicy, type PrivacyPolicyResponse } from "@/lib/api";

export async function generateMetadata() {
  const t = await getTranslations("privacyPolicy");
  return {
    title: t("title"),
  };
}

async function fetchPrivacyPolicy(): Promise<PrivacyPolicyResponse | null> {
  try {
    return await getPrivacyPolicy();
  } catch {
    return null;
  }
}

function PrivacyPolicyContent({
  data,
  errorMessage,
}: {
  data: PrivacyPolicyResponse | null;
  errorMessage: string;
}) {
  if (!data) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">
        {errorMessage}
      </div>
    );
  }

  const formattedDate = new Date(data.updatedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="mb-8 flex flex-col gap-2 border-b border-[var(--color-border)] pb-6 text-sm text-label-assistive">
        <p>버전: {data.version}</p>
        <p>최종 수정일: {formattedDate}</p>
      </div>
      <div
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </>
  );
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacyPolicy");
  const data = await fetchPrivacyPolicy();

  return (
    <main className="min-h-screen bg-white py-20">
      <Container maxWidth="md" className="px-6">
        <h1 className="mb-8 text-3xl font-bold text-label-regular">{t("title")}</h1>
        <PrivacyPolicyContent data={data} errorMessage={t("error")} />
      </Container>
    </main>
  );
}
