"use client";
import { KanjiData } from "@/types/Kanji";
import React from "react";

type Props = {
  kanji: string;
  metadata: KanjiData | null;
  mode?: "flash" | "detail";
};

const onyomiPreferred = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
  "百",
  "千",
  "万",
  "円",
];

const KanjiMetadata = ({ kanji, metadata, mode = "flash" }: Props) => {
  const getPreferredReading = (kanji: string, metadata: KanjiData) => {
    const { readings_on, readings_kun } = metadata;

    if (readings_on?.length === 0 && readings_kun?.length === 0) {
      return "";
    }

    if (onyomiPreferred.includes(kanji)) {
      return readings_on?.[0] || readings_kun?.[0] || "-";
    } else {
      return readings_kun?.[0] || readings_on?.[0] || "-";
    }
  };

  if (!metadata) {
    return <>No Data</>;
  }

  if (mode === "detail") {
    return (
      <div className="flex flex-col lg:flex-row justify-between text-[#504B38] text-xs lg:text-sm w-full font-indie text-left">
        {/* readings, jlpt */}
        <div className="w-full lg:w-1/2 flex flex-col gap-[4px]">
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

          <p className="w-full">
            JLPT:{" "}
            <span className="font-semibold">
              {metadata.jlpt_new?.toString() || "-"}
            </span>
          </p>
        </div>

        {/* meanings, stroke */}
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
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 text-[#504B38] text-sm lg:text-lg w-full font-indie text-left kanji-reading-meaning">
      <div className="col-span-2">Reading: </div>
      <div className="pl-[16px] lg:pl-0 col-span-12 lg:col-span-4 font-semibold">
        {getPreferredReading(kanji, metadata)}
      </div>

      <div className="col-span-2">Meaning: </div>
      <div className="pl-[16px] lg:pl-0 col-span-12 lg:col-span-4 font-semibold">
        {metadata.meanings?.[0] || ""}
      </div>

      {/* debugging only */}
      {/* <div className="col-span-2">Level: </div>
      <div className="col-span-12 lg:col-span-4 font-semibold">
        {metadata.jlpt_new?.toString() || ""}
      </div> */}
    </div>
  );
};

export default KanjiMetadata;
