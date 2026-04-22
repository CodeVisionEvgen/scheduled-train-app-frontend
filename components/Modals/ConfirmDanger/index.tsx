import { api } from "@/lib/api";
import { showError } from "@/utils/error";
import { Modal, Button } from "@heroui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type IProps = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  message: string;
  header: string;
  id: number;
  onSuccess?: () => void;
};

export const ModalConfirmDanger = ({
  isOpen,
  id,
  setIsOpen,
  message,
  header,
  onSuccess,
}: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteTrainHandler = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/scheduled-train/${id}`);
      onSuccess?.();
      setIsOpen(false);
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401) {
        await api.get("/auth/refresh");
        await deleteTrainHandler();
        return;
      }
      const data = err?.response?.data as { message: string };
      showError(data.message || "Unhandled error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Backdrop>
        <Modal.Container size="lg">
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                <div className="mt-5">{header}</div>
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>{message}</p>
            </Modal.Body>
            <Modal.Footer className="w-full flex justify-between">
              <Button
                variant="danger"
                onClick={deleteTrainHandler}
                slot="close"
                isPending={isLoading}
              >
                Continue
              </Button>
              <Button variant="outline" slot="close" isPending={isLoading}>
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
