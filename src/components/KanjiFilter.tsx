"use client";
import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "motion/react";

const jlpt = [5, 4, 3, 2, 1];

const KanjiFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryLevel = searchParams.getAll("level");

  const handleLevelChange = (levelValue: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    let levels = [...new Set(searchParams.getAll("level"))];

    if (isChecked) {
      if (!levels.includes(levelValue)) {
        levels.push(levelValue);
      }
    } else {
      levels = levels.filter((l) => l !== levelValue);
    }

    params.delete("level");

    if (levels.length > 0) {
      levels.forEach((level) => params.append("level", level));
    }

    router.push(`?${params.toString()}`);
  };

  // TODO: make the transform for the DisclosureButton smooth movement
  return (
    <Disclosure
      as="div"
      className="text-typography-foreground w-full filter-controls"
      defaultOpen={true}
    >
      {({ open }) => (
        <>
          <DisclosureButton className="flex justify-start">
            <motion.span className="text-sm font-medium hover:text-typography-hover flex items-center gap-2 cursor-pointer">
              <AdjustmentsHorizontalIcon width={24} height={24} />
              Filters
            </motion.span>
          </DisclosureButton>

          {/* panel with Framer Motion animation */}
          <AnimatePresence>
            {open && (
              <DisclosurePanel
                static
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                }}
                className="overflow-hidden shadow-gray-200 shadow-sm"
              >
                <div className="mt-2 p-[8px] rounded-md shadow-md flex flex-col gap-[8px]">
                  {/* jlpt filter */}
                  <div className="flex gap-[16px]">
                    JLPT:
                    {/* options */}
                    <span className="flex gap-[16px]">
                      {jlpt.map((level) => (
                        <div
                          key={level}
                          className="col-span-3 lg:col-span-1 text-center flex gap-[4px]"
                        >
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleLevelChange(
                                level.toString(),
                                e.target.checked
                              )
                            }
                            checked={queryLevel.includes(level.toString())}
                          />
                          <span>{`N${level}`}</span>
                        </div>
                      ))}
                    </span>
                  </div>

                  {/* no-repeat */}
                  {/* <div className="flex gap-[4px]">
                    <input
                      type="checkbox"
                      onChange={(event: any) => {
                        const params = new URLSearchParams(
                          searchParams.toString()
                        );

                        router.push(`?repeat=${event.target.checked}`);
                      }}
                    />
                    No Repeat
                  </div> */}
                </div>
              </DisclosurePanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
};

export default KanjiFilter;
