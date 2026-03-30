"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authClient, useSession } from "@/lib/auth/auth-client";
import { Session } from "@/types/session";
import { Loader2, Monitor, ShieldAlert, Smartphone } from "lucide-react";
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

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          Sessions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage all active sessions across your devices.
        </p>
      </div>

      <Card>
        <CardHeader className="px-4 pt-5 sm:px-6">
          <CardTitle className="text-sm sm:text-base">
            Active sessions
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            These are the devices currently signed in to your account. Revoke
            any session you don't recognize.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-0 px-4 sm:px-6">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">
              No active sessions found.
            </p>
          ) : (
            sessions.map((s, i) => {
              const isCurrent = s.token === currentToken;
              const { browser, os } = parseUserAgent(s.userAgent);
              const DeviceIcon = getDeviceIcon(s.userAgent);
              const isRevoking = revokingId === s.id;

              return (
                <div key={s.id}>
                  {i > 0 && <Separator />}

                  <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <DeviceIcon className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-foreground wrap-break-word">
                          {browser} on {os}
                        </p>

                        {isCurrent && (
                          <Badge
                            variant="secondary"
                            className="text-xs rounded-full bg-primary/10 text-primary"
                          >
                            Current
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground wrap-break-word">
                        {!s.ipAddress ||
                        s.ipAddress ===
                          "0000:0000:0000:0000:0000:0000:0000:0000"
                          ? "localhost"
                          : s.ipAddress}{" "}
                        · Last active {formatDate(s.updatedAt)}
                      </p>

                      <p className="text-xs text-muted-foreground/60">
                        Signed in {formatDate(s.createdAt)}
                      </p>
                    </div>

                    {!isCurrent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevoke(s.token, s.id)}
                        disabled={isRevoking}
                        className="w-full shrink-0 text-destructive hover:text-destructive hover:border-destructive/50 sm:w-auto"
                      >
                        {isRevoking ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <>
                            <ShieldAlert className="mr-1.5 h-3.5 w-3.5" />
                            Revoke
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionsTab;
