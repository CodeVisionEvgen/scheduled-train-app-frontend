"use client";
import { Button, Surface } from "@heroui/react";
import { useUser } from "@/hooks/useUser";
import { logoutHandler } from "@/lib/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Train() {
  const { user, loading, isAuth } = useUser();
  const navigator = useRouter();

  useEffect(() => {
    if (loading === false && !isAuth) navigator.replace("/");
  }, [loading]);

  return user ? (
    <div className=" grid gap-4 mt-5">
      <Surface
        className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
        variant="secondary"
      >
        <h3 className="text-base font-semibold text-foreground">
          User email: {user?.email}
        </h3>
      </Surface>

      <Button onClick={logoutHandler} variant="danger">
        Logout
      </Button>
    </div>
  ) : (
    <></>
  );
}
