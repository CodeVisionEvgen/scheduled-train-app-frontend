import { User } from "@/hooks/useUser";
import { api, logoutHandler } from "@/lib/api";
import { Dropdown, Header, Label } from "@heroui/react";
import { useRouter } from "next/navigation";

type IProps = {
  user: User;
};
export const UserComponent = ({ user }: IProps) => {
  const navigator = useRouter();
  function redirectToProfile() {
    navigator.push("/profile");
  }
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className=" rounded-full text-xl font-bold bg-blue-700 w-8 h-8 text-center text-white select-none">
          {user?.email?.slice(0, 1)}
        </div>
      </Dropdown.Trigger>
      <Dropdown.Popover className="min-w-[256px]">
        <Dropdown.Menu selectionMode="single">
          <Dropdown.Section>
            <Header>
              <p className="text-[10px] text-center text-gray-300">
                You logged as {user.email}
              </p>
            </Header>
            <Dropdown.Item
              onClick={redirectToProfile}
              id="profile"
              textValue="Profile"
            >
              <Dropdown.ItemIndicator />
              <Label>Profile</Label>
            </Dropdown.Item>
            <Dropdown.Item
              id="logout"
              onClick={logoutHandler}
              textValue="Logout"
              variant="danger"
            >
              <Dropdown.ItemIndicator />
              <Label>Logout</Label>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
