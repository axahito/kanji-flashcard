import IconButton from "@/components/Buttons/IconButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import TextInput from "@/components/Inputs/TextInput";
import GuestLayout from "@/components/Layouts/GuestLayout";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { ReactElement, useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto w-full md:w-[554px] rounded-lg p-[8px] md:p-[32px] md:shadow-lg">
      <h4 className="text-typography-hover hidden lg:flex">Sign In</h4>

      <form className="md:mt-[40px] flex flex-col gap-[16px]">
        <TextInput
          label="Email"
          required
          type="email"
          placeholder="Your Email Address"
          prefix={<EnvelopeIcon width={"100%"} height={"100%"} />}
        />

        <TextInput
          label="Password"
          required
          type={showPassword ? "text" : "password"}
          placeholder="Your Password"
          prefix={<LockClosedIcon width={"100%"} height={"100%"} />}
          suffix={
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              role="button"
              type="button"
            >
              {showPassword ? (
                <EyeSlashIcon width={"100%"} height={"100%"} />
              ) : (
                <EyeIcon width={"100%"} height={"100%"} />
              )}
            </IconButton>
          }
        />

        <PrimaryButton>Sign In</PrimaryButton>

        <div className="w-full flex justify-between">
          <p>New to Kanji Flashcard?</p>

          <Link href={"/signup"} className="hover:underline">
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
