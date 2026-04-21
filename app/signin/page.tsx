"use client";

import { Logo } from "@/components/icons";
import { signinSchema } from "@/schemas/zod/signin";
import { showError } from "@/utils/error";
import { Button, Input } from "@heroui/react";

export default function Signin() {
  function signupHandler(e: any) {
    e.preventDefault();
    const [emailField, passwordField] = e.target;

    const [email, password] = [emailField.value, passwordField.value];

    const result = signinSchema.safeParse({
      email,
      password,
    });

    const errors = JSON.parse(result.error?.message ?? "[]");
    if (errors.length) {
      for (const error of errors) {
        const message = error?.message || "Unhandled error";
        showError(message);
      }
    }
  }
  return (
    <div className=" grid justify-center">
      <div className=" w-[300px] sm:w-[600px] border border-default p-4">
        <div className=" grid  justify-center">
          <Logo size={130} />
          <p className="font-bold text-inherit text-center">Schedule Train</p>
        </div>
        <h2 className="text-xl">Sign in</h2>
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
            autoComplete="current-password"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
          />
          <Button type="submit" fullWidth className="mt-2">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
