"use client";
import { KanjiData } from "@/types/Kanji";
import React from "react";

type Props = {
  kanji: string;
  metadata: KanjiData | null;
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

const KanjiMetadata = ({ kanji, metadata }: Props) => {
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

  return (
    <div className="grid grid-cols-12 text-[#504B38] text-sm lg:text-lg w-full font-indie text-left">
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
