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

export const ModalFullUpdateTrain = ({
  isOpen,
  setIsOpen,
  header,
  item,
  onSuccess,
}: IProps) => {
  if (!item) return null;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departure, setDeparture] = useState<string>("");
  const [arrival, setArrival] = useState<string>("");
  async function replaceDataTrainHandler(e: SubmitEvent<HTMLFormElement>) {
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
    }

    try {
      setIsLoading(true);
      await api.put(`/scheduled-train/${item!.id}`, {
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
        await replaceDataTrainHandler(e);
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
                onSubmit={replaceDataTrainHandler}
                action=""
                className="grid gap-3 mt-4"
              >
                <Label>Train number</Label>
                <Input
                  variant="secondary"
                  placeholder="Train number"
                  name="number"
                  id="number"
                />
                <Label>From</Label>
                <Input
                  placeholder="From"
                  variant="secondary"
                  name="from"
                  id="from"
                />
                <Label>To</Label>
                <Input variant="secondary" placeholder="To" name="to" id="to" />
                <Input
                  value={departure}
                  readOnly
                  className="hidden"
                  variant="secondary"
                  name="departure"
                  id="departure"
                />
                <Input
                  value={arrival}
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
                    isPending={isLoading}
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    slot="close"
                  >
                    Close
                  </Button>
                  <Button isPending={isLoading} type="submit" variant="primary">
                    Update
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
