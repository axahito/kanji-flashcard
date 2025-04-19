"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import kanjiDB from "../data/kanji-jouyou.json";
import KanjiMetadata from "./KanjiMetadata";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { KanjiData } from "@/types/Kanji";

type Props = {
  index?: number;
};

const Flashcard = ({ index }: Props) => {
  const searchParams = useSearchParams();

  const [[kanji, data], setKanjiData] = useState<[string, KanjiData | null]>([
    "",
    null,
  ]);
  const [queryLevels, setQueryLevels] = useState<string[]>([]);

  useEffect(() => {
    const newKanji = fetchUniqueKanji({ currentKanji: kanji });

    if (newKanji) {
      setKanjiData(newKanji);
    }
  }, [setKanjiData, queryLevels]);

  useEffect(() => {
    setQueryLevels(searchParams.getAll("level"));
  }, [searchParams]);

  // TODO: clean this up
  const fetchUniqueKanji = useCallback(
    ({
      currentKanji,
      maxAttempts = 5,
    }: {
      currentKanji?: string;
      maxAttempts?: number;
    }): [string, KanjiData] | null => {
      /**
       * Get a random kanji from the database.
       * @returns {array} A 2-element array containing the kanji character and its data.
       */
      const getOneRandom = () => {
        const kanjiArray = Object.entries(kanjiDB);
        const filteredKanjiArray =
          queryLevels.length > 0
            ? kanjiArray.filter((kanji) => {
                return queryLevels.includes(
                  kanji[1].jlpt_new?.toString() || ""
                );
              })
            : kanjiArray;

        const randomKanji =
          filteredKanjiArray[
            Math.floor(Math.random() * filteredKanjiArray.length)
          ];
        return randomKanji;
      };

      /**
       * Get a kanji from the database by its index.
       * @param {number} index - The index of the kanji in the database.
       * @returns {array} A 2-element array containing the kanji character and its data.
       */
      const getOneByIndex = (index: number) => {
        const kanjiArray = Object.entries(kanjiDB);
        const pickedKanji = kanjiArray[index];
        return pickedKanji;
      };

      /**
       * Save a kanji to the user's local storage.
       * @param {string} kanji - The kanji character to save.
       * @returns {void}
       */
      const handleSave = (kanji: string) => {
        const seenKanji = localStorage.getItem("seenKanji");
        if (seenKanji) {
          localStorage.setItem(
            "seenKanji",
            JSON.stringify([...JSON.parse(seenKanji), kanji])
          );
        } else {
          localStorage.setItem("seenKanji", JSON.stringify([kanji]));
        }
      };

      let attempts = 0;

      const tryFetch = (): [string, KanjiData] | null => {
        attempts++;
        const kanjiData = index ? getOneByIndex(index) : getOneRandom();

        if (kanjiData[0] !== currentKanji) {
          handleSave(kanjiData[0]);
          return kanjiData as [string, KanjiData];
        } else if (attempts < maxAttempts) {
          return tryFetch();
        } else {
          console.warn("Max attempts reached finding unique kanji");
          return null;
        }
      };

      return tryFetch();
    },
    [index, queryLevels]
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-[393px] lg:w-[540px] lg:h-[236px] bg-[#F2E2B1] flex flex-col items-center justify-center p-[32px] gap-[32px] relative rounded-md shadow-xl z-40">
        {/* <div className="rounded-full bg-transparent w-[32px] h-[32px] absolute top-[16px] left-[16px]" /> */}
        {/* <div className="rounded-xs bg-gradient-to-l from-[#E4E0E1] to-[#B7B7B7] w-[100px] h-[16px] absolute top-[4px] left-[-45px] rotate-[35deg]" /> */}
        <h1 className="text-8xl text-[#504B38] font-noto">{kanji}</h1>
        <KanjiMetadata kanji={kanji} metadata={data} />

        <button
          onClick={() => {
            const newKanji = fetchUniqueKanji({ currentKanji: kanji });

            if (newKanji) {
              setKanjiData(newKanji);
            }
          }}
          className="text-[#504B38] absolute bottom-[16px] right-[16px] hover:text-[#BDB395] transition-colors duration-200 cursor-pointer"
        >
          <ArrowRightIcon width={24} height={24} />
        </button>
      </div>
    </Suspense>
  );
};

export default Flashcard;
