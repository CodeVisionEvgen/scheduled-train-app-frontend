"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { IScheduledTrain } from "@/types";
import { AxiosError } from "axios";
import { showError } from "@/utils/error";

type TrainsResponse = {
  trains: IScheduledTrain[];
  limit: number;
  count: number;
};

export function useTrains(initialLimit = 10, isMock?: boolean) {
  const [trains, setTrains] = useState<IScheduledTrain[]>([]);
  const [offset, setOffset] = useState(0);

  const [limit] = useState(initialLimit);
  const [count, setCount] = useState(0);

  const [query, setQuery] = useState<string>("");
  const [departure, setDepature] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchTrains = async (
    currentOffset: number,
    query: string,
    sort: string,
    departure: string,
  ) => {
    setLoading(true);
    setError(null);
    if (isMock) return;

    try {
      const res = await api.get<TrainsResponse>("/scheduled-train", {
        params: {
          skip: currentOffset,
          limit: currentOffset + limit,
          departure,
          query,
          sort,
        },
      });

      const data = res.data;
      setTrains(data.trains);
      setCount(data.count);
    } catch (e) {
      setError(e);
      const err = error as AxiosError;
      try {
        await api.get("/auth/refresh");
        await fetchTrains(offset, query, sort, departure);
        return;
      } catch (error) {}
      const data = err?.response?.data as { message: string };
      showError(data.message || "Unhandled error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrains(offset, query, sort, departure);
  }, [offset, query, sort, departure]);

  const refetch = () => {
    fetchTrains(offset, query, sort, departure);
  };

  const hasMore = trains?.length < count;

  return {
    trains,
    loading,
    error,
    refetch,
    setOffset,
    setQuery,
    setDepature,
    setSort,
    limit,
    offset,
    count,
    hasMore,
  };
}
