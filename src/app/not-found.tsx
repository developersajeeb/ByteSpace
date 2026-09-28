import type { Metadata } from "next";
import { BlueBand } from "@/components/decor/BlueBand";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="relative">
      <Header />
      <main>
        <BlueBand className="min-h-[640px] lg:h-[957px]">
          <div className="container-page relative flex flex-col items-center pt-[120px] pb-20 text-center lg:pt-[160px]">
            <p
              aria-hidden
              className="bg-[linear-gradient(180deg,#d4fb20_0%,rgb(212_251_32/0.96)_30%,rgb(212_251_32/0.81)_50%,rgb(212_251_32/0.61)_70%,rgb(255_255_255/0)_100%)] bg-clip-text font-poppins text-[200px] leading-none font-semibold tracking-[-0.01em] text-transparent sm:text-[320px] lg:text-[480px]"
            >
              404
            </p>
            <div className="relative -mt-16 flex max-w-[935px] flex-col items-center gap-8 sm:-mt-24 lg:-mt-[119px]">
              <h1 className="font-poppins text-[36px] font-semibold tracking-[-0.01em] text-white sm:text-[56px] lg:text-[72px] leading-[1.2] lg:leading-[86px]">
                The page you are looking for doesn’t exist
              </h1>
              <p className="type-body-l text-gray-100">Try to use a correct url or go back to homepage to start again</p>
              <ButtonLink href="/">Back to Home</ButtonLink>
            </div>
          </div>
        </BlueBand>
      </main>
      <Footer />
    </div>
  );
}
