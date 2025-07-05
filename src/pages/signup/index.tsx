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
import FormControl from "@/components/Form/FormControl";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, errors, isLoading } = useSignupForm();

  return (
    <div className="mx-auto w-full md:w-[554px] rounded-lg p-[8px] md:p-[32px] md:shadow-lg">
      <h4 className="text-typography-hover hidden lg:flex">Sign Up</h4>

      <form
        onSubmit={handleSubmit}
        className="md:mt-[40px] flex flex-col gap-[16px]"
      >
        <div className="w-full flex flex-col md:flex-row gap-[16px] md:gap-[8px]">
          <FormControl
            label="First Name"
            errorMessage={errors.firstName?.message}
          >
            <TextInput
              {...register("firstName")}
              required
              type="text"
              placeholder="Your First Name"
            />
          </FormControl>

          <FormControl
            label="Last Name"
            errorMessage={errors.lastName?.message}
          >
            <TextInput
              {...register("lastName")}
              required
              type="text"
              placeholder="Your Last Name"
            />
          </FormControl>
        </div>

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
                data-testid="toggle-password"
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

        <FormControl
          label="Confirm Password"
          errorMessage={errors.confirmPassword?.message}
        >
          <TextInput
            {...register("confirmPassword")}
            required
            type={"password"}
            placeholder="Confrim Your Password"
            prefix={<LockClosedIcon width={"100%"} height={"100%"} />}
            // onChange={() => validateConfirmPassword()}
          />
        </FormControl>

        <div className="w-full flex flex-col lg:flex-row gap-[16px] lg:gap-[8px]">
          <span className="w-full lg:w-1/2">
            <PrimaryButton role="submit" disabled={isLoading} fullWidth>
              {isLoading ? "Loading..." : "Sign Up"}
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
