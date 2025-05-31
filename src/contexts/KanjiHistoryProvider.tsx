import { KanjiData } from "@/types/Kanji";
import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

type KanjiHistoryContextType = {
  kanjiHistory: [string, KanjiData | null][];
  addKanji: (kanji: [string, KanjiData | null]) => void;
  backIndex: number;
  setBackIndex: Dispatch<SetStateAction<number>>;
  // getPreviousKanji: () => [string, KanjiData | null];
};

const MAX_HISTORY = 200; // Adjust as needed

const KanjiHistoryContext = createContext<KanjiHistoryContextType | undefined>(
  undefined
);

export const KanjiHistoryProvider = ({ children }) => {
  const [kanjiHistory, setKanjiHistory] = useState<
    [string, KanjiData | null][]
  >([]);
  const [backIndex, setBackIndex] = useState(1);

  const addKanji = (kanji: [string, KanjiData | null]) => {
    setKanjiHistory((prev) => {
      const newHistory = [...prev, kanji];
      return newHistory.slice(-MAX_HISTORY);
    });
  };

  // const getPreviousKanji = () => {
  //   if (backIndex === kanjiHistory.length - 1) {
  //     return kanjiHistory[0];
  //   }

  //   const
  //   setBackIndex((prev) => prev + 1);
  //   return kanjiHistory[kanjiHistory.length - backIndex];
  // };

  return (
    <KanjiHistoryContext.Provider
      value={{ kanjiHistory, addKanji, backIndex, setBackIndex }}
    >
      {children}
    </KanjiHistoryContext.Provider>
  );
};

export const useKanjiHistory = () => {
  const context = useContext(KanjiHistoryContext);
  if (!context) {
    throw new Error("useKanji must be used within a KanjiProvider");
  }
  return context;
};
