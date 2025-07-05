import Flashcard from "@/components/Flashcard";
import KanjiFilter from "@/components/KanjiFilter";
import ClientLayout from "@/components/Layouts/ClientLayout";
import { KanjiHistoryProvider } from "@/contexts/KanjiHistoryProvider";
import React, { ReactElement } from "react";

export default function Dashboard() {
  return (
    <>
      <div className="md:left-[10dvw] lg:left-[28dvw] w-full md:w-[540px] mt-[32px]">
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

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout>{page}</ClientLayout>;
};
