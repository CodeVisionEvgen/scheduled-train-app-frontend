"use client";

import { Logo } from "@/components/icons";
import { api } from "@/lib/api";
import { signupSchema } from "@/schemas/zod/signup";
import { showError } from "@/utils/error";
import { Button, Input } from "@heroui/react";
import { AxiosError } from "axios";
import { SubmitEvent } from "react";

export default function Signup() {
  async function signupHandler(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeatedPassword = formData.get("repeat-password") as string;

    const result = signupSchema.safeParse({
      email,
      password,
      repeatedPassword,
    });

    const errors = JSON.parse(result.error?.message ?? "[]");
    if (errors.length) {
      for (const error of errors) {
        const message = error?.message || "Unhandled error";
        showError(message);
      }
    }
    try {
      await api.post("/auth/signup", {
        password,
        email,
      });

      window.location.href = "/trains";
    } catch (error) {
      const err = error as AxiosError;
      const data = err?.response?.data as { message: string };
      showError(data.message || "Unhandled error");
      return;
    }
  }
  return (
    <div className=" grid justify-center">
      <div className=" w-[300px] sm:w-[600px] border border-default p-4">
        <div className=" grid  justify-center">
          <Logo size={130} />
          <p className="font-bold text-inherit text-center">Schedule Train</p>
        </div>
        <h2 className="text-xl ">Sign up</h2>
        <form onSubmit={signupHandler} action="" className="grid gap-2 mt-4">
          <Input
            required
            type="email"
            autoComplete="email"
            placeholder="Email"
            name="email"
            id="email"
          />
          <Input
            required
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            name="password"
            id="password"
          />
          <Input
            required
            type="password"
            autoComplete="new-password"
            placeholder="Repeat Password"
            name="repeat-password"
            id="repeat-password"
          />
          <Button type="submit" fullWidth className="mt-2">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
