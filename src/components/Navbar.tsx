import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import IconButton from "./Buttons/IconButton";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "./Buttons/PrimaryButton";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Sign Up",
      href: "/signup",
    },
    {
      label: "Sign In",
      href: "/signin",
    },
  ];

  const LinkLabel = ({
    textAlign = "text-center",
    children,
  }: {
    textAlign?: "text-left" | "text-center" | "text-right";
    children: React.ReactNode;
  }) => {
    return (
      <h6
        className={`text-typography-foreground hover:text-typography-hover transition-colors duration-200 ${textAlign} text-[18px] lg:text-[20px]`}
      >
        {children}
      </h6>
    );
  };

  return (
    <nav className="w-full p-[16px] md:px-[32px] shadow-sm md:shadow-none sticky top-0 bg-[#F6F0F0] z-30">
      {/* mobile navbar */}
      <div
        className={`w-full grid ${
          isHome ? "grid-cols-1" : "grid-cols-3"
        } md:hidden`}
      >
        {isHome ? (
          <Link href={"/signin"}>
            <LinkLabel textAlign="text-right">Sign In</LinkLabel>
          </Link>
        ) : (
          <>
            <IconButton
              data-testid="nav-back-button"
              // onClick={() => router.back()}
              onClick={() => router.push("/")}
            >
              <ChevronLeftIcon width={18} height={18} />
              Back
            </IconButton>

            <LinkLabel>
              {links.find((link) => link.href === pathname)?.label}
            </LinkLabel>
          </>
        )}
      </div>

      {/* desktop navbar */}
      <div className="w-full flex items-center justify-between">
        <Link href={"/"}>
          <LinkLabel textAlign="text-left">Flashcard</LinkLabel>
        </Link>

        <div className="flex gap-[32px] items-center">
          <Link
            href={"/signin"}
            className="text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200 hover:underline"
          >
            Sign In
          </Link>

          <Link href={"/signup"}>
            <PrimaryButton>Sign Up</PrimaryButton>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
