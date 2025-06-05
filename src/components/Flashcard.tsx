"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import kanjiDB from "../data/kanji-jouyou.json";
import KanjiMetadata from "./KanjiMetadata";
import { ArrowTurnDownRightIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { KanjiData } from "@/types/Kanji";
import { AnimatePresence, motion } from "motion/react";
import { isEqual } from "lodash";
import { useTour } from "@/contexts/TourProvider";
import IconButton from "./Buttons/IconButton";
import { useKanjiHistory } from "@/contexts/KanjiHistoryProvider";

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
  const [isDragging, setIsDragging] = useState(false);
  // const [isStartTourModalOpen, setIsStartTourModalOpen] = useState(false);

  const { setIsRunning, setSteps } = useTour();
  const { kanjiHistory, addKanji, backIndex, setBackIndex } = useKanjiHistory();

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

  useEffect(() => {
    setSteps([
      {
        target: ".welcome",
        prompt:
          "Welcome to Kanji Flashcards! Ready to dive into learning kanji?",
      },
      {
        target: ".flashcard",
        prompt: "Here's your flashcard—the starting point of your journey.",
        padding: {
          px: 32,
          py: 32,
        },
      },
      {
        target: ".flashcard .kanji-main",
        prompt: "This is the main kanji you'll focus on memorizing.",
      },
      {
        target: ".flashcard .kanji-reading-meaning",
        prompt: "Below it, you'll find its reading and meaning.",
      },
      {
        target: ".flashcard",
        prompt: "Tap or click the card to flip it over.",
        callback: () => setIsFlipped(true),
        padding: {
          px: 32,
          py: 32,
        },
      },
      {
        target: ".flashcard",
        prompt: "The back side gives you more detailed info about the kanji.",
        callback: () => setIsFlipped(false),
        padding: {
          px: 32,
          py: 32,
        },
      },
      {
        target: ".arrow-next",
        prompt: "When you're ready, use the arrow to move to the next kanji.",
        callback: () => handleNext(0),
      },
      {
        target: ".flashcard",
        prompt: "You can now memorize the next kanji, and the next one after.",
        padding: {
          px: 32,
          py: 32,
        },
      },
      {
        target: ".filter-controls",
        prompt: "Want to focus? You can filter kanji by JLPT level.",
      },
      {
        target: ".end",
        prompt: "Enjoy learning—and keep chasing that dream!",
      },
    ]);

    const hasRunTour = localStorage.getItem("hasRunTour") === "true";

    if (!hasRunTour) {
      // setIsStartTourModalOpen(true);
      setIsRunning(true);
    }

    return () => {
      setSteps(null);
    };
  }, []);

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

    // Add current kanji to history before getting new one
    if (
      cards[from].kanji &&
      kanjiHistory[kanjiHistory.length - (backIndex - 1)]?.[0] !==
        cards[from].kanji?.[0]
    ) {
      addKanji(cards[from].kanji);
    }

    // Reset back index since we're moving forward
    setBackIndex(1);

    // Get new kanji
    const newKanji = fetchUniqueKanji({
      currentKanji: cards[from]?.kanji?.[0],
    });

    // Update cards with consistent ordering
    setCards((prevCards) => {
      // Create new array to maintain immutability
      const newCards = prevCards.map((card) => ({ ...card }));

      // Move the card that was at 'from' to the back
      const [movedCard] = newCards.splice(from, 1);
      const updatedCard = {
        ...movedCard,
        kanji: newKanji,
      };

      // Always maintain cards[0] as current card, cards[1] as next card
      newCards.push(updatedCard);

      return newCards;
    });

    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = (from: number) => {
    // Check if we have history to go back to
    if (kanjiHistory.length === 0 || backIndex > kanjiHistory.length) {
      return;
    }

    setIsAnimating(true);

    // Get the previous kanji from history
    const previousKanji = kanjiHistory[kanjiHistory.length - backIndex];

    setCards((prevCards) => {
      // Create new array to maintain immutability
      const newCards = prevCards.map((card) => ({ ...card }));

      // Remove the card at 'from' position
      const [movedCard] = newCards.splice(from, 1);

      // Create updated card with previous kanji
      const updatedCard = {
        ...movedCard,
        kanji: previousKanji,
      };

      // Add to front to maintain cards[0] as current card
      newCards.unshift(updatedCard);

      return newCards;
    });

    // Increment back index to track position in history
    setBackIndex((prev) => prev + 1);

    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <AnimatePresence>
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
              className={`absolute w-full lg:w-[540px] h-[248px] lg:min-h-[236px] bg-[#F2E2B1] flex flex-col cursor-grab ${
                index === 0 && isFlipped
                  ? "justify-start items-end"
                  : "justify-center items-center"
              } p-[32px] gap-[32px] rounded-md shadow-xl flashcard`}
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
      </AnimatePresence> */}
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
              className={`absolute w-full lg:w-[540px] h-[248px] lg:min-h-[236px] bg-[#F2E2B1] flex flex-col cursor-grab ${
                index === 0 && isFlipped
                  ? "justify-start items-end"
                  : "justify-center items-center"
              } p-[32px] gap-[32px] rounded-md shadow-xl flashcard`}
              drag={index === 0 && isFlipped ? false : "x"}
              dragConstraints={{ left: -200, right: 200 }}
              dragElastic={0.2}
              dragSnapToOrigin={true}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_event, info) => {
                if (info.offset.x < -100) {
                  handleNext(index);
                }

                if (info.offset.x > 100) {
                  handlePrev(index);
                }

                setTimeout(() => setIsDragging(false), 100);
              }}
              whileDrag={{
                scale: 1.05,
                rotateZ: -5,
                opacity: 0.8,
              }}
              // onTap={() => {
              //   if (index === 0 && !isDragging) {
              //     setIsFlipped(!isFlipped);
              //   }
              // }}
              onClick={() => {
                if (index === 0 && !isDragging) {
                  setIsFlipped(!isFlipped);
                }
              }}
            >
              {index === 0 && isFlipped ? (
                <BackSide card={card} />
              ) : (
                <FrontSide
                  card={card}
                  index={index}
                  onClick={handleNext}
                  backIndex={backIndex}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* //TODO: blocked by audioRefs not assigned on first step */}
      {/* <Modal
        isOpen={isStartTourModalOpen}
        onClose={() => setIsStartTourModalOpen(false)}
        title="Site Tour"
      >
        <div className="flex flex-col gap-[8px] p-[16px] text-[#222831] font-indie">
          <div className="flex flex-col">
            <h5 className="font-semibold">
              First time here? Let's take a quick tour!
            </h5>
            <p className="text-base">
              It'll help you get started with learning kanji faster
            </p>
          </div>
        </div>

        <div className="w-full flex justify-end p-[16px] gap-[8px]">
          {!config?.forced && (
            <OutlinedButton
              onClick={() => setIsStartTourModalOpen(false)}
              className="lg:min-w-[100px]"
            >
              Skip
            </OutlinedButton>
          )}

          <PrimaryButton
            onClick={() => {
              setIsRunning(true);
              setIsStartTourModalOpen(false);
            }}
            className="lg:min-w-[100px]"
          >
            Start
          </PrimaryButton>
        </div>
      </Modal> */}

      <ul className="text-black text-lg mt-[300px]">
        {kanjiHistory.map((kanji, index) => (
          <li key={index}>{kanji[0]}</li>
        ))}
      </ul>
    </Suspense>
  );
};

const FrontSide = ({
  card,
  onClick,
  index,
  backIndex,
}: {
  card: KanjiItem;
  onClick: (index: number) => void;
  index: number;
  backIndex: number;
}) => {
  return (
    <>
      <h1 className="text-[#504B38] font-noto kanji-main text-8xl font-normal">
        {card?.kanji?.[0]}
      </h1>
      <KanjiMetadata
        kanji={card?.kanji?.[0] || ""}
        metadata={card?.kanji?.[1] || null}
      />

      {/* <button
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          onClick(index);
        }}
        className="text-[#222831] absolute bottom-[16px] right-[16px] hover:text-[#393E46] transition-colors duration-200 cursor-pointer arrow-next"
      >
        <ArrowTurnDownRightIcon width={24} height={24} />
      </button> */}

      <p className="text-black text-lg">{backIndex}</p>
      <IconButton
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          onClick(index);
        }}
        disabled={index !== 0}
        className="absolute bottom-[16px] right-[16px] arrow-next"
      >
        <ArrowTurnDownRightIcon width={24} height={24} />
      </IconButton>
    </>
  );
};

const BackSide = ({ card }: { card: KanjiItem }) => {
  const metadata = card.kanji?.[1];

  if (!metadata) {
    return <>No Data</>;
  }

  return (
    <div className="rotate-y-180 flex flex-col gap-[8px] w-full">
      <div className="flex flex-row gap-[4px] justify-between text-[#504B38] text-xs lg:text-sm w-full font-indie text-left">
        {/* kanji, readings */}
        <div className="w-full lg:w-1/2 flex flex-col gap-[4px]">
          <h3 className="text-[#504B38] font-noto font-normal text-5xl">
            {card?.kanji?.[0]}
          </h3>

          <p className="w-full">
            On Yomi:{" "}
            <span className="font-semibold">
              {metadata.readings_on?.join(", ") || ""}
            </span>
          </p>

          <p className="w-full">
            Kun Yomi:{" "}
            <span className="font-semibold">
              {metadata.readings_kun?.join(", ") || ""}
            </span>
          </p>
        </div>

        {/* meanings, stroke, jlpt */}
        <div className="w-full lg:w-1/2 flex flex-col gap-[4px]">
          <p className="w-full">
            Meanings:{" "}
            <span className="font-semibold">
              {metadata.meanings?.join(", ") || ""}
            </span>
          </p>

          <p className="w-full">
            Grade:{" "}
            <span className="font-semibold">
              {metadata.grade?.toString() || "-"}
            </span>
          </p>

          <p className="w-full">
            Strokes:{" "}
            <span className="font-semibold">
              {metadata.strokes?.toString() || "-"}
            </span>
          </p>

          <p className="w-full">
            JLPT:{" "}
            <span className="font-semibold">
              {metadata.jlpt_new?.toString() || "-"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
