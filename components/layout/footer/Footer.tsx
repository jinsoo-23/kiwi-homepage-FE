import { Container } from "@/components/ui/Container";
import { FooterCompanyInfo } from "./FooterCompanyInfo";
import { FooterLegal } from "./FooterLegal";

export async function Footer() {
  return (
    <footer className="bg-label-regular text-linus-white">
      <Container maxWidth="xl" className="px-6 py-10 md:py-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-8 text-linus-white text-base md:text-[18px]">
          <FooterCompanyInfo />
          <FooterLegal />
        </div>
      </Container>
    </footer>
  );
}
