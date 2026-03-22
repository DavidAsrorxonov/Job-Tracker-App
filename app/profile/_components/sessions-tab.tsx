"use client";

import { authClient, useSession } from "@/lib/auth/auth-client";
import { Session } from "@/types/session";
import { Monitor, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

const parseUserAgent = (ua?: string) => {
  if (!ua) return { browser: "Unknown browser", os: "Unknown OS" };

  let browser = "Unknown browser";
  let os = "Unknown OS";

  if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";

  if (ua.includes("Windows NT")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Linux") && !ua.includes("Android")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  return { browser, os };
};

const getDeviceIcon = (ua?: string) => {
  if (!ua) return Monitor;
  if (ua.includes("iPhone") || ua.includes("Android") || ua.includes("iPad"))
    return Smartphone;
  return Monitor;
};

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const SessionsTab = () => {
  const { data: session } = useSession();
  const currentToken = session?.session.token;

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const fetchSessions = async () => {
    const { data } = await authClient.listSessions();
    if (data) setSessions(data as Session[]);
  };

  useEffect(() => {
    fetchSessions().finally(() => setLoading(false));
  }, []);

  const handleRevoke = async (sessionToken: string, sessionId: string) => {
    setRevokingId(sessionId);
    try {
      await authClient.revokeSession({ token: sessionToken });
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (error) {
      console.log(error);
    } finally {
      setRevokingId(null);
    }
  };

  return <div>SessionsTab</div>;
};

export default SessionsTab;
