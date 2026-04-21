"use client";

import { title } from "@/components/primitives";
import { ScheduledTrainsTable } from "@/components/ScheduledTrains/Table";
import { smallScheduledTrains } from "@/mocks";
import { List } from "@/components/List";
import { Divider } from "@/components/Divider";
import { useState } from "react";
import { ScheduledTrain } from "@/types";

export default function Home() {
  const [scheduledTrains, setScheduledTrains] = useState<ScheduledTrain[]>([]);
  const useMockdata = scheduledTrains.length === 0;

  return (
    <>
      <section className="flex  flex-col items-center justify-center gap-4 py-8 md:py-10 ">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>
            Make your travel planning
            <p className=" text-accent  contents">&nbsp;easier</p> with our
            train schedule app.
          </span>
        </div>
      </section>
      <section>
        <h3 className="text-2xl font-bold">A Train Schedule Application</h3>
        <p className=" font-mono">
          An application with a train schedule that can be authorized, edited,
          deleted, updated, and sorted.
        </p>
        <p className="text-xl mt-8 mb-2">Main requirements</p>
        <List
          items={[
            "Set up the projects (Front-end and Back-end).",
            "Connect a database to your backend server.",
            "Create a few pages and backend for them.",
            "Make simple authorization and authentication (password, jwt).",
          ]}
        />
      </section>
      <section className="mt-4">
        <p className="text-xl mb-2">Technologies Stack</p>
        <List
          items={[
            "Language: TypeScript.",
            "Server: Node.js (Nest.js).",
            "Database: PostgreSQL.",
            "Front-end: Next.js.",
          ]}
        />
      </section>
      <Divider />

      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-5">
          Latest Train Scheduled {useMockdata && "(Example)"}
        </h3>
        <ScheduledTrainsTable
          isMock={useMockdata}
          isLimited
          data={smallScheduledTrains}
        />
      </section>
    </>
  );
}
