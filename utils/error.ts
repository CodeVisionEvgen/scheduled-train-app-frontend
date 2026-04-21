import { toast } from "@heroui/react";

export const showError = (message: string) => {
  const errorToasts = toast
    .getQueue()
    .visibleToasts.filter((data) =>
      data.content.title?.toString().startsWith("Error count:"),
    );
  const errorCount = [...errorToasts].length;
  toast(`Error count: ${errorCount + 1}`, {
    actionProps: {
      children: "Dismiss",
      onPress: () => toast.clear(),
      variant: "danger",
    },
    description: message,
    variant: "danger",
  });
};
