import React, { useState } from "react";
import IconButton from "../Buttons/IconButton";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  AcademicCapIcon,
  ArrowLeftEndOnRectangleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";

const navItems = [
  {
    name: "Study Room",
    href: "/dashboard",
    icon: <AcademicCapIcon width={28} height={28} />,
  },
  {
    name: "Library",
    href: "/library",
    icon: <BookOpenIcon width={28} height={28} />,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const { profile, logout } = useAuth();

  return (
    <>
      {/* sidebar toggle button */}
      <IconButton
        className={`fixed top-[16px] left-0 ${
          isOpen ? "translate-x-[280px]" : "translate-x-0"
        } bg-[#F6F0F0] rounded-r-md shadow-lg p-[8px] hover:bg-primary-500 hover:text-white duration-200 ease-in-out transition-transform`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronLeftIcon width={24} height={24} />
        ) : (
          <ChevronRightIcon width={24} height={24} />
        )}
      </IconButton>

      {/* sidebar */}
      <aside
        className={`w-screen md:w-[280px] h-full bg-[#F6F0F0] border-r border-gray-300 fixed z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } duration-200 ease-in-out flex flex-col gap-[24px] p-[16px] md:py-[24px]`}
      >
        {/* logo and close button */}
        <div className="flex space-between w-full items-center">
          <div className="flex gap-[8px] items-center">
            {/* logo image */}
            <div className="relative w-[64px] aspect-square">
              <Image
                src="/image/logo_tmp.png"
                alt="kanji-flashcard-logo"
                fill
                className="object-contain"
                sizes="64px"
                priority
              />
            </div>
          </div>

          <IconButton
            className="top-[16px] right-[16px] md:hidden ml-auto"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon width={24} height={24} />
          </IconButton>
        </div>

        {/* nav links */}
        <ul className="flex flex-col gap-[8px]">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;

            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex flex-row gap-[16px] items-center pl-[24px] pr-[16px] py-[16px] hover:bg-[#EDE6E6] duration-200 ease-in-out rounded-md text-typography-foreground ${
                    isActive ? "bg-[#EDE6E6]" : "bg-transparent"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium text-base">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* profile card, logout button and version tag */}
        <div className="flex flex-col gap-[8px] border-t border-gray-300 mt-auto">
          <div className="flex flex-row gap-[8px] border-b border-gray-300 p-[8px]">
            {/* profile card */}
            <div className="flex flex-col w-[60%]">
              <span className="font-medium text-base text-ellipsis text-nowrap overflow-hidden w-[228px] text-typography-foreground">{`${profile?.firstName} ${profile?.lastName}`}</span>
              <span className="font-light text-sm text-typography-background">
                {profile?.email}
              </span>
            </div>

            {/* logout button */}
            <IconButton
              className="top-[16px] right-[16px] ml-auto"
              onClick={async () => {
                await logout();
                router.push("/signin");
              }}
            >
              <ArrowLeftEndOnRectangleIcon width={24} height={24} />
            </IconButton>
          </div>

          {/* version tag */}
          <div className="flex flex-row md:flex-col gap-[4px] justify-center">
            <p className="text-xs text-typography-background text-center">
              Crafted by Abiyyu Rohman version 0.5
            </p>
            <p className="text-xs text-typography-background text-center">
              #100ProjectsForJapan
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
