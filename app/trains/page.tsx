"use client";
import { ScheduledTrainsTable } from "@/components/ScheduledTrains/Table";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TrainsPage() {
  const { loading, isAuth } = useUser();
  const navigator = useRouter();

  useEffect(() => {
    if (loading === false && !isAuth) navigator.replace("/");
  }, [loading]);
  return (
    <div>
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold mb-6">Scheduled Trains</h1>
      </div>
      <ScheduledTrainsTable />
    </div>
  );
}
