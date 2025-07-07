import Flashcard from "@/components/Flashcard";
import KanjiFilter from "@/components/KanjiFilter";
import ClientLayout from "@/components/Layouts/ClientLayout";
import { KanjiHistoryProvider } from "@/contexts/KanjiHistoryProvider";
import React, { ReactElement } from "react";

export default function Library() {
  return (
    <div className="w-full flex p-[32px]">
      <h5>Library</h5>
    </div>
  );
}

Library.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout>{page}</ClientLayout>;
};
