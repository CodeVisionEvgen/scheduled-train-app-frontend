import { Modal, Button } from "@heroui/react";
import { ReactNode } from "react";

type IProps = {
  Trigger: ReactNode;
  message: string;
};

export const ModalConfirmDanger = ({ Trigger, message }: IProps) => {
  return (
    <Modal>
      <Modal.Trigger>{Trigger}</Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground"></Modal.Icon>
              <Modal.Heading>Ye</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>{message}</p>
            </Modal.Body>
            <Modal.Footer className="w-full flex justify-between">
              <Button variant="danger" slot="close">
                Close
              </Button>
              <Button variant="outline" slot="close">
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
