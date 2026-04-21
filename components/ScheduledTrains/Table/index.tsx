"use client";

import { ScheduledTrain } from "@/types";
import { prettyDate } from "@/utils/date";
import { Button, EmptyState, Table, Dropdown, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { TableSearch } from "./Search";
import { TableDateField } from "./DateField";
import { ExternalLink } from "@/components/ExternalLink";
import { TableSort } from "./Sort";
import { TableActionsDropdown } from "./Actions/Dropdown";

type IProps = {
  isLimited?: boolean;
  isMock?: boolean;
  data: ScheduledTrain[];
};

const ScheduledTrainsTableEmptyState = () => {
  return <p className="text-muted-foreground">No scheduled trains found.</p>;
};

const FilterAndSort = () => {
  return (
    <div className="w-full grid sm:flex sm:justify-between gap-2">
      <div className=" items-center grid sm:flex sm:justify-between gap-2">
        <TableSearch />
        <TableDateField />
      </div>
      <div className="mb-10 sm:mb-0">
        <TableSort />
      </div>
    </div>
  );
};

export const ScheduledTrainsTable = ({ isLimited, data, isMock }: IProps) => {
  const navigate = useRouter();

  const redirectToAllTrains = () => {
    if (isMock) {
      navigate.push("/signup");
    } else {
      navigate.push("/trains");
    }
  };

  return (
    <Table className="p-4 bg-background border border-default">
      {!isLimited && <FilterAndSort />}
      <Table.ScrollContainer>
        <Table.Content aria-label="Scheduled trains" className="min-w-[600px]">
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
                  <ScheduledTrainsTableEmptyState />
                </EmptyState>
              );
            }}
            items={data ?? []}
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
                  <TableActionsDropdown item={item} />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      {isLimited && data?.length > 0 && (
        <div className=" flex justify-center w-full">
          <Button
            onClick={redirectToAllTrains}
            variant="primary"
            size="lg"
            className=" mt-4"
          >
            {isMock ? "Try it" : "View All"}
          </Button>
        </div>
      )}
    </Table>
  );
};
