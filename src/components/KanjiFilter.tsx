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
      className="text-[#504B38] w-[540px]"
      defaultOpen={true}
    >
      <DisclosureButton className="group flex w-full justify-start">
        <span className="text-sm font-medium hover:text-[#BDB395] duration-200 ease-out transition-all cursor-pointer">
          <AdjustmentsHorizontalIcon width={24} height={24} />
        </span>
      </DisclosureButton>
      <DisclosurePanel
        transition
        className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
      >
        <div className="p-[8px] rounded-md shadow-md shadow-gray-200 grid grid-cols-12">
          {/* JLPT filter */}
          <div className="col-span-2">JLPT:</div>
          {jlpt.map((level) => (
            <div key={level} className="col-span-1 text-center flex gap-[4px]">
              <input
                type="checkbox"
                onChange={(e) =>
                  handleLevelChange(level.toString(), e.target.checked)
                }
                value={level}
                checked={queryLevel.includes(level.toString())}
              />{" "}
              <span>{`N${level}`}</span>
            </div>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default KanjiFilter;
