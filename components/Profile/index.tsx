import { User } from "@/hooks/useUser";
import { Button, Skeleton } from "@heroui/react";
import { useRouter } from "next/navigation";
import { UserComponent } from "./UserComponent";

type IProps = {
  user?: User | null;
  isLoading: boolean;
};

export const Profile = ({ user, isLoading }: IProps) => {
  const navigator = useRouter();

  return isLoading ? (
    <Skeleton className="w-30 h-10" />
  ) : user ? (
    <UserComponent user={user} />
  ) : (
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
