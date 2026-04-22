"use client";
import { useParams, useRouter } from "next/navigation";
import { largeScheduledTrains } from "@/mocks";
import { Surface } from "@heroui/react";
import { prettyDate } from "@/utils/date";
import { TableActionsDropdown } from "@/components/ScheduledTrains/Table/Actions/Dropdown";
import { ModalConfirmDanger } from "@/components/Modals/ConfirmDanger";
import { useEffect, useState } from "react";
import { ModalEditTrain } from "@/components/Modals/EditTrain";
import { useUser } from "@/hooks/useUser";
import { api } from "@/lib/api";
import { showError } from "@/utils/error";
import { AxiosError } from "axios";
import { IScheduledTrain } from "@/types";
import Link from "next/link";

export default function Train() {
  const params = useParams();
  const id = params.slug;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [train, setTrain] = useState<IScheduledTrain>();

  const { loading, isAuth } = useUser();
  const navigator = useRouter();

  async function fetchTrain() {
    try {
      const res = await api.get(`/scheduled-train/${id}`);
      setTrain(res.data);
    } catch (error) {
      const err = error as AxiosError;
      if (err.status === 401) {
        await api.get("/auth/refresh");
        await fetchTrain();
        return;
      }
      const data = err?.response?.data as { message: string };
      showError(data.message || "Unhandled error");
    }
  }

  useEffect(() => {
    if (loading === false && !isAuth) navigator.replace("/");

    if (loading === false && isAuth) {
      fetchTrain();
    }
  }, [loading]);

  if (!train) {
    return null;
  }

  return (
    <div>
      <ModalConfirmDanger
        id={train.id}
        setIsOpen={setIsDeleteModalOpen}
        isOpen={isDeleteModalOpen}
        message="This action cannot be undone."
        header={`Confirm Delete ${train?.from}/${train?.to}`}
      />
      <ModalEditTrain
        item={train}
        setIsOpen={setIsEditModalOpen}
        isOpen={isEditModalOpen}
        header={`Update ${train?.from}/${train?.to}`}
      />
      <div className="flex justify-between items-end">
        <div className="grid sm:flex sm:justify-between items-center gap-4">
          <Link href={"/trains"} className="text-blue-600 underline">
            {"<-"} Go back
          </Link>
          <h2 className="text-2xl font-bold">
            Scheduled Train {train?.from}/{train?.to}
          </h2>
        </div>

        <TableActionsDropdown
          hideOpenElement
          item={train}
          onAction={({ key }) => {
            const actions: { [key: string]: () => void } = {
              delete: () => {
                setIsDeleteModalOpen((bool) => !bool);
              },
              edit: () => {
                setIsEditModalOpen((bool) => !bool);
              },
            };
            actions[key]?.();
          }}
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 mt-5">
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
          variant="secondary"
        >
          <h3 className="text-base font-semibold text-foreground">
            Main Content
          </h3>
          <p className="text-sm text-muted">
            Train identificator: {train?.number}
          </p>
          <p className="text-sm text-muted">From: {train?.from}</p>
          <p className="text-sm text-muted">To: {train?.to}</p>
        </Surface>
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
          variant="secondary"
        >
          <h3 className="text-base font-semibold text-foreground">
            Travel details
          </h3>
          <p className="text-sm text-muted">
            Departure: {prettyDate(train?.departure || "")}
          </p>
          <p className="text-sm text-muted">
            Arrival: {prettyDate(train?.arrival || "")}
          </p>
        </Surface>
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
          variant="secondary"
        >
          <h3 className="text-base font-semibold text-foreground">
            Additional info
          </h3>
          <p className="text-sm text-muted">Entity id: {train.id}</p>
          <p className="text-sm text-muted">
            Created At: {prettyDate(train?.createdAt || "")}
          </p>
          <p className="text-sm text-muted">
            Updated At:{" "}
            {train?.updatedAt ? prettyDate(train.updatedAt) : "None"}
          </p>
        </Surface>
      </div>
    </div>
  );
}
