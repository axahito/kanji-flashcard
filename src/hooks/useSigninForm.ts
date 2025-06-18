import { signinSchema, SigninSchema } from "@/schema/signinSchema";
import { AuthService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useSigninForm() {
  const router = useRouter();

  // states
  const [isLoading, setIsLoading] = useState(false);

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SigninSchema) => {
    console.log("Submitted:", data);
    const { email, password } = data;

    setIsLoading(true);

    try {
      const userSignInResponse = await AuthService.signIn(email, password);
      if (!userSignInResponse.user || userSignInResponse.error) {
        throw userSignInResponse.error;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // useForm
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,

    // states
    isLoading,
    setIsLoading,
  };
}
