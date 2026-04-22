import { trainSchema } from "@/schemas/zod/train";
import { IScheduledTrain } from "@/types";
import { showError } from "@/utils/error";
import { Button, Input, Modal } from "@heroui/react";
import { ReactNode, SubmitEvent, useState } from "react";
import { Label } from "@heroui/react";
import { WrappedDatePicker } from "@/components/WrappedDatePicker";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

type IProps = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => any;
  header: ReactNode;
  item?: IScheduledTrain;
  onSuccess: () => void;
};

export const ModalAddTrain = ({
  isOpen,
  setIsOpen,
  header,
  onSuccess,
}: IProps) => {
  const [departure, setDeparture] = useState<string>("");
  const [arrival, setArrival] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function addTrainHandler(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const number = formData.get("number") as string;
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const departure = formData.get("departure") as string;
    const arrival = formData.get("arrival") as string;

    const result = trainSchema.safeParse({
      number,
      from,
      to,
      departure,
      arrival,
    });
    const errors = JSON.parse(result.error?.message ?? "[]");
    if (errors.length) {
      for (const error of errors) {
        const message = error?.message || "Unhandled error";
        showError(message);
      }
      return;
    }

    try {
      setIsLoading(true);
      await api.post(`/scheduled-train`, {
        from,
        to,
        arrival,
        departure,
        number,
      });
      onSuccess();
      setIsOpen(false);
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401) {
        await api.get("/auth/refresh");
        await addTrainHandler(e);
        return;
      }
      const data = err?.response?.data as { message: string };
      showError(data.message || "Unhandled error");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Backdrop>
        <Modal.Container size="md">
          <Modal.Dialog className="sm:max-w-[500px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{header}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={addTrainHandler}
                action=""
                className="grid gap-3 mt-4"
              >
                <Label>Train number</Label>
                <Input
                  variant="secondary"
                  required
                  placeholder="Train number"
                  name="number"
                  id="number"
                />
                <Label>From</Label>
                <Input
                  required
                  placeholder="From"
                  variant="secondary"
                  name="from"
                  id="from"
                />
                <Label>To</Label>
                <Input
                  required
                  variant="secondary"
                  placeholder="To"
                  name="to"
                  id="to"
                />
                <Input
                  value={departure}
                  readOnly
                  required
                  className="hidden"
                  variant="secondary"
                  name="departure"
                  id="departure"
                />
                <Input
                  value={arrival}
                  required
                  readOnly
                  variant="secondary"
                  className="hidden"
                  name="arrival"
                  id="arrival"
                />
                <WrappedDatePicker
                  onChange={(date) => {
                    const userTimeZone =
                      Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const start = date.start.toDate(userTimeZone).toISOString();
                    const end = date.end.toDate(userTimeZone).toISOString();

                    setDeparture(start);
                    setArrival(end);
                  }}
                />
                <div className="w-full flex mt-6 justify-between">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    slot="close"
                    isPending={isLoading}
                  >
                    Close
                  </Button>
                  <Button type="submit" variant="primary" isPending={isLoading}>
                    Add
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
