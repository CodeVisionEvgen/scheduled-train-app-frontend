"use client";
import { ScheduledTrainsTable } from "@/components/ScheduledTrains/Table";
import { largeScheduledTrains } from "@/mocks";

export default function TrainsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Scheduled Trains</h1>
      <ScheduledTrainsTable data={largeScheduledTrains} />
    </div>
  );
}
