"use client";
import { useTour } from "@/contexts/TourProvider";
import React from "react";
import IconButton from "../Buttons/IconButton";

const WelcomeOverlay = () => {
  const {
    isRunning,
    setIsRunning,
    targetRect,
    steps,
    currentStep,
    setCurrentStep,
    config,
  } = useTour();

  const handleClose = () => setIsRunning(false);

  const handleNext = () => {
    if (!steps) {
      return;
    }

    if (currentStep < steps!.length - 1) {
      steps[currentStep].callback?.();

      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300);
    } else {
      handleClose();
    }
  };

  // const handlePrev = () => {
  //   if (!steps) {
  //     return;
  //   }

  //   if (currentStep > 0) {
  //     setCurrentStep((prev) => prev - 1);
  //   } else {
  //     handleClose();
  //   }
  // };

  const handleClick = (e: React.MouseEvent) => {
    if (!steps) {
      return;
    }

    const { clientX, clientY } = e;
    const isInside =
      clientX >= left &&
      clientX <= right &&
      clientY >= top &&
      clientY <= bottom;

    if (isInside) {
      handleNext();
    } else {
      if (config?.forced) return;
      handleClose();
    }
  };

  if (!isRunning || !targetRect || !steps) return null;

  const { top, left, right, bottom, width, height } = targetRect;
  const { px, py } = steps[currentStep].padding || {};
  const { x, y } = steps[currentStep].position || {};

  return (
    <>
      {/* backdrop overlay */}
      <div
        className="fixed inset-0 bg-black opacity-60 z-40 transition-all duration-300 ease-in-out"
        onClick={handleClick}
        style={{
          WebkitMaskImage: `
        linear-gradient(black, black), radial-gradient(ellipse at center, black 0%, black 100%)
      `,
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: `0 0, ${(x ? x : left) - (px ? px / 2 : 8)}px ${
            (y ? y : top) - (py ? py / 2 : 8)
          }px`,
          WebkitMaskSize: `100% 100%, ${width > 0 ? width + (px ?? 16) : 0}px ${
            height ? height + (py ?? 16) : 0
          }px`,
        }}
      />

      {/* popover */}
      <div
        className={`absolute w-[90dvw] lg:max-w-[400px] min-h-[236px] bg-[#D8D8D8] opacity-100 z-50 font-indie rounded-md flex flex-col justify-center items-center transition-all duration-300 ease-in-out 
          top-3/4 -translate-y-1/2 left-1/2 -translate-x-1/2 ${
            !top ? "lg:top-1/2" : "lg:translate-y-0"
          } ${!left ? "lg:left-1/2" : "lg:translate-x-0"}`}
        style={{
          // these will only apply at lg screens and up
          ...(window.innerWidth >= 1024 &&
            top && { top: `${top + height + 24}px` }),
          ...(window.innerWidth >= 1024 && left && { left: `${left}px` }),
        }}
      >
        {/* prompt */}
        <div className="w-full flex justify-center items-center px-[32px] pt-[32px]">
          <h4 className="text-[#222831] text-2xl">
            {steps[currentStep].prompt}
          </h4>
        </div>

        {/* icons */}
        <div className="w-full flex justify-center mt-auto p-[16px] gap-[8px]">
          {/* //TODO: button on hold until can figure out how the callbacks going to work */}
          {/* <IconButton
            onClick={handlePrev}
            className="ml-auto"
            disabled={currentStep === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-left-icon lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </IconButton> */}

          <IconButton onClick={handleNext} className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-right-icon lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default WelcomeOverlay;
