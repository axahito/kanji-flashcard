"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { StepType } from "@/contexts/TourProvider";

type Props = {
  currentStep: number;
  steps: StepType[];
};

const Typewriter = ({ currentStep, steps }: Props) => {
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  const sentenceVariants = {
    hidden: {},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
  };

  useEffect(() => {
    audioRefs.current = [new Audio("/audio/medium-text-blip-14855.mp3")];

    console.log("AUDIO REFS", audioRefs);

    return () => audioRefs.current.forEach((audio) => audio.pause());
  }, []);

  const handleStartAudio = () => {
    const sfx = audioRefs.current[0];
    if (!sfx) return;
    sfx.currentTime = 0;
    sfx.volume = 1;

    sfx.play().catch((e) => console.log("SFX error:", e));
  };

  return (
    <div className="w-full flex justify-center items-center px-[32px] pt-[32px]">
      <motion.h5
        key={currentStep}
        variants={sentenceVariants}
        initial="hidden"
        animate="visible"
        className="text-[#222831]"
        onAnimationStart={() => {
          console.log("ANIMATION START?");
          handleStartAudio();
        }}
        onAnimationComplete={() => {
          audioRefs.current.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
          });
        }}
      >
        {steps[currentStep].prompt.split("").map((char, i) => {
          return (
            <motion.span key={`${char}-${i}`} variants={letterVariants}>
              {char}
            </motion.span>
          );
        })}
      </motion.h5>
    </div>
  );
};

export default Typewriter;
