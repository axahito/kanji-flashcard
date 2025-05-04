import React, { createContext, useContext, useEffect, useState } from "react";

interface TourContextType {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  targetRect: DOMRect | null;
  setTargetRect: React.Dispatch<React.SetStateAction<DOMRect | null>>;
  steps: StepType[] | null;
  setSteps: React.Dispatch<React.SetStateAction<StepType[] | null>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  config?: {
    forced?: boolean;
  };
}

type TourContextProps = {
  children: React.ReactNode;
  config?: {
    forced?: boolean;
  };
};

export type StepType = {
  target: string;
  prompt: string;
  callback?: () => void;
  position?: {
    x?: number;
    y?: number;
  };
  padding?: {
    px?: number;
    py?: number;
  };
};

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider = ({ children, config }: TourContextProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [steps, setSteps] = useState<StepType[] | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (steps && steps.length > 0) {
      const targetElement = document.querySelector(steps[currentStep].target);
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      setTargetRect(rect);
      console.log("Target:", targetElement);
      console.log("Position:", rect.left, rect.top);
      console.log("Size:", rect.width, rect.height);

      if (currentStep === steps.length - 1) {
        localStorage.setItem("hasRunTour", "true");
      }
    }
  }, [steps, currentStep]);

  return (
    <TourContext.Provider
      value={{
        isRunning,
        setIsRunning,
        targetRect,
        setTargetRect,
        steps,
        setSteps,
        currentStep,
        setCurrentStep,
        config,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
