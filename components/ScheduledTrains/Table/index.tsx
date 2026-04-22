"use client";

import { IScheduledTrain } from "@/types";
import { prettyDate } from "@/utils/date";
import {
  Button,
  EmptyState,
  Table,
  Dropdown,
  Label,
  Pagination,
  Spinner,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { TableSearch } from "./Search";
import { TableDateField } from "./DateField";
import { ExternalLink } from "@/components/ExternalLink";
import { TableSort } from "./Sort";
import { TableActionsDropdown } from "./Actions/Dropdown";
import { ModalConfirmDanger } from "@/components/Modals/ConfirmDanger";
import { useEffect, useState } from "react";
import { ModalEditTrain } from "@/components/Modals/EditTrain";
import { useTrains } from "@/hooks/useTrains";
import { ModalFullUpdateTrain } from "@/components/Modals/FullUpdate";
import { AddTrain } from "@/components/AddTrain";
import { smallScheduledTrains } from "@/mocks";
import { useUser } from "@/hooks/useUser";

type IProps = {
  isMock?: boolean;
};

const ScheduledTrainsTableEmptyState = () => {
  return <p className="text-muted-foreground">No scheduled trains found.</p>;
};

type IFilterAndSortProps = {
  setDepature: (text: string) => void;
  setQuery: (text: string) => void;
  setSort: (text: string) => void;
};

const FilterAndSort = ({
  setDepature,
  setQuery,
  setSort,
}: IFilterAndSortProps) => {
  return (
    <div className="w-full grid sm:flex sm:justify-between gap-2">
      <div className=" items-center grid sm:flex sm:justify-between gap-2">
        <TableSearch onChange={setQuery} />
        <TableDateField onChange={setDepature} />
      </div>
      <div className="mb-10 sm:mb-0">
        <TableSort onChange={setSort} />
      </div>
    </div>
  );
};

export const ScheduledTrainsTable = ({ isMock }: IProps) => {
  const navigate = useRouter();
  const [activeItem, setActiveItem] = useState<IScheduledTrain>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isFullUpdateModalOpen, setIsFullUpdateModalOpen] =
    useState<boolean>(false);
  const { user } = useUser();

  const {
    trains,
    count,
    offset,
    limit,
    refetch,
    setOffset,
    setDepature,
    setQuery,
    setSort,
    loading,
  } = useTrains(10, isMock);

  const redirectToAllTrains = () => {
    if (user) {
      navigate.push("/trains");
    } else {
      navigate.push("/signup");
    }
  };

  const actions: { [key: string]: (item: IScheduledTrain) => void } = {
    delete: (item) => {
      setActiveItem(item);
      setIsDeleteModalOpen((bool) => !bool);
    },
    open: (item) => {
      navigate.push(`/train/${item.id}`);
    },
    edit: (item) => {
      setActiveItem(item);
      setIsEditModalOpen((bool) => !bool);
    },
    fullUpdate: (item) => {
      setActiveItem(item);
      setIsFullUpdateModalOpen((bool) => !bool);
    },
  };

  return (
    <>
      <ModalConfirmDanger
        id={activeItem?.id || 0}
        onSuccess={refetch}
        setIsOpen={setIsDeleteModalOpen}
        isOpen={isDeleteModalOpen}
        message="This action cannot be undone."
        header={`Confirm Delete ${activeItem?.from}/${activeItem?.to}`}
      />
      <ModalEditTrain
        onSuccess={refetch}
        item={activeItem}
        setIsOpen={setIsEditModalOpen}
        isOpen={isEditModalOpen}
        header={`Update ${activeItem?.from}/${activeItem?.to}`}
      />
      <ModalFullUpdateTrain
        item={activeItem}
        setIsOpen={setIsFullUpdateModalOpen}
        isOpen={isFullUpdateModalOpen}
        onSuccess={refetch}
        header={`Replace data for ${activeItem?.from}/${activeItem?.to}`}
      />
      <div className="w-full flex justify-end">
        <AddTrain isMock={isMock} refetch={refetch} />
      </div>

      <Table className="p-4 bg-background border border-default">
        {!isMock && (
          <FilterAndSort
            setDepature={setDepature}
            setQuery={setQuery}
            setSort={setSort}
          />
        )}
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Scheduled trains"
            className="min-w-[600px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>From</Table.Column>
              <Table.Column>To</Table.Column>
              <Table.Column>Departure</Table.Column>
              <Table.Column>Arrival</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => {
                return (
                  <EmptyState className="flex h-full p-10 w-full flex-col items-center justify-center gap-4 text-center">
                    {loading ? <Spinner /> : <ScheduledTrainsTableEmptyState />}
                  </EmptyState>
                );
              }}
              items={isMock ? smallScheduledTrains : (trains ?? [])}
            >
              {(item) => (
                <Table.Row className="rounded-none">
                  <Table.Cell>
                    <ExternalLink
                      href={`https://en.wikipedia.org/wiki/${item.from}`}
                      label={item.from}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <ExternalLink
                      href={`https://en.wikipedia.org/wiki/${item.to}`}
                      label={item.to}
                    />
                  </Table.Cell>
                  <Table.Cell>{prettyDate(item.departure)}</Table.Cell>
                  <Table.Cell>{prettyDate(item.arrival)}</Table.Cell>
                  <Table.Cell>
                    <TableActionsDropdown
                      isMock={isMock}
                      onAction={async ({ key, item }) => {
                        actions[key]?.(item);
                      }}
                      item={item}
                    />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        {isMock && (
          <div className=" flex justify-center w-full">
            <Button
              onClick={redirectToAllTrains}
              variant="primary"
              size="lg"
              className=" mt-4"
            >
              Try it
            </Button>
          </div>
        )}
        {!isMock && (
          <Pagination className="w-full mt-4">
            <Pagination.Summary>
              {offset} to {offset + limit} of {count} scheduled trains
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={offset + limit <= limit}
                  onPress={() => setOffset((p) => p - limit)}
                >
                  <Pagination.PreviousIcon />
                  <span>Prev</span>
                </Pagination.Previous>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={offset + limit >= count}
                  onPress={() => setOffset((p) => p + limit)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        )}
      </Table>
    </>
  );
};
