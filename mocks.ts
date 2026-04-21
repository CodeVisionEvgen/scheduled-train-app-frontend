export const smallScheduledTrains = [
  {
    id: "1",
    from: "Kyiv",
    number: "12a",
    to: "Lviv",
    departure: "2024-07-01T08:00:00Z",
    arrival: "2024-07-01T12:00:00Z",
  },
  {
    id: "2",
    number: "11b",
    from: "Kyiv",
    to: "Odesa",
    departure: "2024-07-01T09:00:00Z",
    arrival: "2024-07-01T13:00:00Z",
  },
  {
    id: "3",
    number: "10b",
    from: "Lviv",
    to: "Kyiv",
    departure: "2024-07-01T10:00:00Z",
    arrival: "2024-07-01T14:00:00Z",
  },
];

export const largeScheduledTrains = [
  ...smallScheduledTrains,
  {
    id: "4",
    number: "1b",
    from: "Odesa",
    to: "Kyiv",
    departure: "2024-07-01T11:00:00Z",
    arrival: "2024-07-01T15:00:00Z",
  },
  {
    id: "5",
    number: "1a",
    from: "Kyiv",
    to: "Kharkiv",
    departure: "2024-07-01T12:00:00Z",
    arrival: "2024-07-01T16:00:00Z",
  },
  {
    id: "6",
    number: "1c",
    from: "Kharkiv",
    to: "Kyiv",
    departure: "2024-07-01T13:00:00Z",
    arrival: "2024-07-01T17:00:00Z",
  },
];
