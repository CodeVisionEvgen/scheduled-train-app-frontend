import { IScheduledTrain } from "./types";

const randomDate = (start: Date, end: Date) =>
  new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  ).toISOString();

const start = new Date("2024-01-01T00:00:00Z");
const end = new Date("2024-12-31T23:59:59Z");

const withTimestamps = <T extends object>(item: T) => ({
  ...item,
  createdAt: randomDate(start, end),
  updatedAt: randomDate(start, end),
});

export const smallScheduledTrains: IScheduledTrain[] = [
  withTimestamps({
    id: 1,
    from: "Kyiv",
    number: "12a",
    to: "Lviv",
    departure: "2024-07-01T08:00:00Z",
    arrival: "2024-07-01T12:00:00Z",
  }),
  withTimestamps({
    id: 2,
    number: "11b",
    from: "Kyiv",
    to: "Odesa",
    departure: "2024-07-01T09:00:00Z",
    arrival: "2024-07-01T13:00:00Z",
  }),
  withTimestamps({
    id: 3,
    number: "10b",
    from: "Lviv",
    to: "Kyiv",
    departure: "2024-07-01T10:00:00Z",
    arrival: "2024-07-01T14:00:00Z",
  }),
];
