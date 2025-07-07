import Flashcard from "@/components/Flashcard";
import KanjiFilter from "@/components/KanjiFilter";
import ClientLayout from "@/components/Layouts/ClientLayout";
import { KanjiHistoryProvider } from "@/contexts/KanjiHistoryProvider";
import React, { ReactElement } from "react";

export default function Library() {
  return <></>;
}

Library.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout>{page}</ClientLayout>;
};
