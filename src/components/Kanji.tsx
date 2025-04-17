"use client";
import React, { useEffect, useState } from "react";
import kanji from "../data/kanji-jouyou.json";

type Props = {
  index?: number;
};
const Kanji = ({ index }: Props) => {
  /**
   * Get a random kanji from the database.
   * @returns {array} A 2-element array containing the kanji character and its data.
   */
  const handleGetOneRandom = () => {
    const kanjiArray = Object.entries(kanji);
    const randomKanji =
      kanjiArray[Math.floor(Math.random() * kanjiArray.length)];
    return randomKanji;
  };

  /**
   * Get a kanji from the database by its index.
   * @param {number} index - The index of the kanji in the database.
   * @returns {array} A 2-element array containing the kanji character and its data.
   */
  const handleGetOneByIndex = (index: number) => {
    const kanjiArray = Object.entries(kanji);
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

  const [[displayKanji, data], setDisplayKanji] = useState<[string, any]>([
    "",
    {},
  ]);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 5;

    const fetchNewKanji = () => {
      attempts++;
      const kanjiData = index
        ? handleGetOneByIndex(index)
        : handleGetOneRandom();

      if (kanjiData[0] !== displayKanji?.[0]) {
        setDisplayKanji(kanjiData);
        handleSave(kanjiData[0]);
      } else if (attempts < maxAttempts) {
        fetchNewKanji();
      } else {
        console.warn("Max attempts reached finding unique kanji");
      }
    };

    fetchNewKanji();

    return () => {
      attempts = maxAttempts;
    };
  }, []);

  return <h1 className="text-2xl text-white">{displayKanji}</h1>;
};

export default Kanji;
