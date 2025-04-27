"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import kanjiDB from "../data/kanji-jouyou.json";
import KanjiMetadata from "./KanjiMetadata";
import {
  ArrowTurnDownRightIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { KanjiData } from "@/types/Kanji";
import { AnimatePresence, motion } from "motion/react";
import { isEqual } from "lodash";

type Props = {
  index?: number;
};

type KanjiItem = {
  id: number;
  kanji: [string, KanjiData | null] | null;
};

const Flashcard = ({ index }: Props) => {
  const searchParams = useSearchParams();

  const [cards, setCards] = useState<KanjiItem[]>([
    { id: 1, kanji: null },
    { id: 2, kanji: null },
  ]);
  const [queryLevels, setQueryLevels] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const imaKanji = fetchUniqueKanji({ currentKanji: cards[0]?.kanji?.[0] });
    const tsugiKanji = fetchUniqueKanji({ currentKanji: cards[1]?.kanji?.[0] });

    if (imaKanji && tsugiKanji) {
      setCards([
        { id: 1, kanji: imaKanji },
        { id: 2, kanji: tsugiKanji },
      ]);
    }
  }, [setCards, queryLevels]);

  useEffect(() => {
    setIsFlipped(false);
    const newLevels = searchParams.getAll("level");
    if (!isEqual(newLevels, queryLevels)) {
      setQueryLevels(newLevels);
    }
  }, [searchParams, setIsFlipped]);

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
      // const handleSave = (kanji: string) => {
      //   const seenKanji = localStorage.getItem("seenKanji");
      //   if (seenKanji) {
      //     localStorage.setItem(
      //       "seenKanji",
      //       JSON.stringify([...JSON.parse(seenKanji), kanji])
      //     );
      //   } else {
      //     localStorage.setItem("seenKanji", JSON.stringify([kanji]));
      //   }
      // };

      let attempts = 0;

      const tryFetch = (): [string, KanjiData] | null => {
        attempts++;
        const kanjiData = index ? getOneByIndex(index) : getOneRandom();

        if (kanjiData[0] !== currentKanji) {
          // handleSave(kanjiData[0]);
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

  const handleNext = (from: number) => {
    setIsAnimating(true);
    const atarashiiKanji = fetchUniqueKanji({
      currentKanji: cards[from]?.kanji?.[0],
    });

    setCards((prevCards) => {
      const newCards = [...prevCards];

      const [movedCard] = newCards.splice(from, 1);

      const updatedCard = {
        ...movedCard,
        kanji: atarashiiKanji,
      };

      newCards.push(updatedCard);

      return newCards;
    });

    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatePresence>
        {cards.map((card, index) => {
          const variants = {
            next: {
              rotateY: 0,
              top: index * 12,
              right: isAnimating && index === 1 ? index * 12 + 32 : index * 12,
              zIndex: cards.length - index,
              transition: { duration: 0.3 },
            },
            flip: {
              rotateY: 180,
              top: index * 12,
              right: index * 12,
              zIndex: cards.length - index,
              transition: { duration: 0.3 },
            },
          };

          return (
            <motion.div
              key={`fg-${card.id}`}
              variants={variants}
              animate={index === 0 && isFlipped ? "flip" : "next"}
              className={`absolute w-full lg:w-[540px] min-h-[248px] lg:min-h-[236px] bg-[#F2E2B1] flex flex-col cursor-grab ${
                index === 0 && isFlipped
                  ? "justify-start items-end"
                  : "justify-center items-center"
              } p-[32px] gap-[32px] rounded-md shadow-xl`}
              onClick={() => {
                setIsFlipped(!isFlipped);
              }}
            >
              {index === 0 && isFlipped ? (
                <BackSide card={card} />
              ) : (
                <FrontSide card={card} index={index} onClick={handleNext} />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Suspense>
  );
};

const FrontSide = ({
  card,
  onClick,
  index,
}: {
  card: KanjiItem;
  onClick: (index: number) => void;
  index: number;
}) => {
  return (
    <>
      <h1 className="text-8xl text-[#504B38] font-noto">{card?.kanji?.[0]}</h1>
      <KanjiMetadata
        kanji={card?.kanji?.[0] || ""}
        metadata={card?.kanji?.[1] || null}
      />

      <button
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          onClick(index);
        }}
        className="text-[#504B38] absolute bottom-[16px] right-[16px] hover:text-[#BDB395] transition-colors duration-200 cursor-pointer"
      >
        <ArrowTurnDownRightIcon width={24} height={24} />
      </button>
    </>
  );
};

const BackSide = ({ card }: { card: KanjiItem }) => {
  return (
    <div className="rotate-y-180 flex flex-col gap-[8px] w-full">
      <h3 className="text-6xl text-[#504B38] font-noto">{card?.kanji?.[0]}</h3>
      <KanjiMetadata
        kanji={card?.kanji?.[0] || ""}
        metadata={card?.kanji?.[1] || null}
        mode="detail"
      />
    </div>
  );
};

export default Flashcard;
