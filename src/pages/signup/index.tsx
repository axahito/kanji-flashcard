import IconButton from "@/components/Buttons/IconButton";
import TextInput from "@/components/Inputs/TextInput";
import GuestLayout from "@/components/Layouts/GuestLayout";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import React, { ReactElement, useState } from "react";
import { useSignupForm } from "../../hooks/useSignupForm";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import Link from "next/link";
import { SignupSchema } from "../../schema/signupSchema";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: SignupSchema) => {
    console.log("Submitted:", data);
  };

  const { register, handleSubmit } = useSignupForm(onSubmit);

  return (
    <div className="mx-auto w-full md:w-[554px] rounded-lg p-[8px] md:p-[32px] md:shadow-lg">
      <h4 className="text-typography-hover hidden lg:flex">Sign Up</h4>

      <form
        onSubmit={handleSubmit}
        className="md:mt-[40px] flex flex-col gap-[16px]"
      >
        <div className="w-full flex flex-col md:flex-row gap-[16px] md:gap-[8px]">
          <TextInput
            {...register("firstName")}
            label="First Name"
            required
            type="text"
            placeholder="Your First Name"
          />

          <TextInput
            {...register("lastName")}
            label="Last Name"
            required
            type="text"
            placeholder="Your Last Name"
          />
        </div>

        <TextInput
          {...register("email")}
          label="Email"
          required
          type="email"
          placeholder="Your Email Address"
          prefix={<EnvelopeIcon width={"100%"} height={"100%"} />}
        />

        <TextInput
          {...register("password")}
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

        <TextInput
          {...register("confirmPassword")}
          label="Confirm Password"
          required
          type={showPassword ? "text" : "password"}
          placeholder="Confrim Your Password"
          prefix={<LockClosedIcon width={"100%"} height={"100%"} />}
        />

        <div className="w-full flex flex-col lg:flex-row gap-[16px] lg:gap-[8px]">
          <span className="w-full lg:w-1/2">
            <PrimaryButton role="submit" fullWidth>
              Sign Up
            </PrimaryButton>
          </span>

          <Link
            href="/signin"
            className="w-full lg:w-1/2 flex items-center justify-center gap-[4px] hover:underline"
          >
            Sign In <ArrowRightIcon width={18} height={18} />
          </Link>
        </div>
      </form>
    </div>
  );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};
