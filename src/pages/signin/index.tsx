import IconButton from "@/components/Buttons/IconButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import FormControl from "@/components/Form/FormControl";
import TextInput from "@/components/Inputs/TextInput";
import GuestLayout from "@/components/Layouts/GuestLayout";
import { useSigninForm } from "@/hooks/useSigninForm";
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

  const { register, handleSubmit, errors, isLoading, error } = useSigninForm();

  return (
    <div className="mx-auto w-full md:w-[554px] rounded-lg p-[8px] md:p-[32px] md:shadow-lg">
      <h4 className="text-typography-hover hidden lg:flex">Sign In</h4>

      <form
        onSubmit={handleSubmit}
        className="md:mt-[40px] flex flex-col gap-[16px]"
      >
        <FormControl label="Email" errorMessage={errors.email?.message}>
          <TextInput
            {...register("email")}
            required
            type="email"
            placeholder="Your Email Address"
            prefix={<EnvelopeIcon width={"100%"} height={"100%"} />}
          />
        </FormControl>

        <FormControl label="Password" errorMessage={errors.password?.message}>
          <TextInput
            {...register("password")}
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
        </FormControl>

        {error && <p className="text-red-500">{error}</p>}

        <PrimaryButton disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </PrimaryButton>

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
