import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchema } from "../schema/signupSchema";
import { useState } from "react";
import { AuthService } from "@/services/auth";
import { UserService } from "@/services/users";

export function useSignupForm() {
  // states
  const [isLoading, setIsLoading] = useState(false);

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupSchema) => {
    console.log("Submitted:", data);
    const { email, password, firstName, lastName } = data;

    setIsLoading(true);

    try {
      const userSignUpResponse = await AuthService.signUp(email, password);
      if (!userSignUpResponse.user || userSignUpResponse.error) {
        throw userSignUpResponse.error;
      }

      const createUserResponse = await UserService.createUser({
        uid: userSignUpResponse.user.uid,
        email,
        firstName,
        lastName,
      });
      if (!createUserResponse.success || createUserResponse.error) {
        throw createUserResponse.error;
      }

      console.log("User created and document added");
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
