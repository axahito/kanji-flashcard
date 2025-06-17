import Flashcard from "@/components/Flashcard";
import KanjiFilter from "@/components/KanjiFilter";
import GuestLayout from "@/components/Layouts/GuestLayout";
import { KanjiHistoryProvider } from "@/contexts/KanjiHistoryProvider";
import { ReactElement } from "react";

export default function Home() {
  return (
    <>
      <div className="md:left-[10dvw] lg:left-[28dvw] w-full md:w-[540px]">
        <KanjiFilter />
      </div>

      <section className="relative w-full lg:w-[540px] lg:h-[236px] mt-0">
        <KanjiHistoryProvider>
          <Flashcard />
        </KanjiHistoryProvider>
      </section>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
