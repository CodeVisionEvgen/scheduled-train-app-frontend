import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export const Profile = () => {
  const navigator = useRouter();
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => {
          navigator.push("/signin");
        }}
        variant="ghost"
      >
        Sign in
      </Button>
      <Button
        onClick={() => {
          navigator.push("/signup");
        }}
        variant="outline"
      >
        Sign up
      </Button>
    </div>
  );
};
