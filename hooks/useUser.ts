"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Cookies from "js-cookie";

export type User = {
  id: string;
  email: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const router = useRouter();

  const fetchMe = async (): Promise<User> => {
    const res = await api.get<User>("/user/me");
    return res.data;
  };

  const refresh = async () => {
    await api.get("/auth/refresh");
  };

  const loadUser = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!Cookies.get("AccessToken")) return;

      const me = await fetchMe();
      setUser(me);
    } catch (e: any) {
      if (e?.response?.status === 401) {
        try {
          await refresh();
          const me = await fetchMe();
          setUser(me);
        } catch {
          setUser(null);
          router.replace("/signin");
        }
      } else {
        setError(e);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const refetch = () => {
    loadUser();
  };

  return {
    user,
    loading,
    error,
    isAuth: !!user,
    refetch,
  };
}
