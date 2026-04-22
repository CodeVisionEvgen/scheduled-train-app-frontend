import { Button } from "@heroui/react";
import { ModalAddTrain } from "../Modals/AddTrain";
import { useState } from "react";
import { useRouter } from "next/navigation";
type IProps = {
  refetch: () => void;
  isMock?: boolean;
};
export const AddTrain = ({ refetch, isMock }: IProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  return (
    <>
      <ModalAddTrain
        isOpen={isAddModalOpen}
        onSuccess={() => {
          refetch();
        }}
        setIsOpen={setIsAddModalOpen}
        header="Add new scheduled train"
      />
      <Button
        isDisabled={isMock}
        onClick={() => {
          setIsAddModalOpen(true);
        }}
        variant="outline"
      >
        + Add
      </Button>
    </>
  );
};
