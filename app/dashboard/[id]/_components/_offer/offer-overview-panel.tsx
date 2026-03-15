"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { equityTypes } from "@/config/offer-overview-panel-equity";
import { CURRENCIES } from "@/constants/currencies";
import { IOfferData } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import { DollarSign, Gift, Percent, TrendingUp } from "lucide-react";
import React, { useState } from "react";

type OfferPanelProps = {
  data: IOfferData;
  updateData: (updater: (p: IOfferData) => IOfferData) => void;
};

function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
  isEmpty,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
  isEmpty: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-3 rounded-xl border p-5 text-left transition-all duration-200 hover:bg-muted/40 hover:border-border w-full",
        isEmpty
          ? "border-dashed border-border/60 bg-muted/10"
          : "border-border/60 bg-muted/20",
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          isEmpty
            ? "bg-muted text-muted-foreground"
            : "bg-primary/10 text-primary",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="space-y-0.5 w-full">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          {label}
        </p>
        <p
          className={cn(
            "text-xl font-bold tracking-tight",
            isEmpty && "text-muted-foreground/40 text-base font-normal",
          )}
        >
          {value}
        </p>
        {subValue && (
          <p className="text-xs text-muted-foreground">{subValue}</p>
        )}
      </div>
    </button>
  );
}

type EditingKey = "salary" | "equity" | "bonus" | null;

const OfferOverviewPanel = ({ data, updateData }: OfferPanelProps) => {
  const [editing, setEditing] = useState<EditingKey>(null);

  const currency = data.currency ?? "USD";

  const formatMoney = (amount?: number) =>
    amount ? `${currency} ${amount.toLocaleString()}` : "—";

  const totalBonus = (data.bonus?.signing ?? 0) + (data.bonus?.annual ?? 0);

  return (
    <Card className="w-full shadow-sm border-border/60">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-semibold tracking-tight">
              Compensation
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Click any card to edit · All figures in {currency}
            </p>
          </div>
          {/* Currency selector */}
          <Select
            value={currency}
            onValueChange={(v) => updateData((p) => ({ ...p, currency: v }))}
          >
            <SelectTrigger className="h-7 w-24 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c} value={c} className="text-xs">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-5 space-y-5">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatCard
            icon={DollarSign}
            label="Base Salary"
            value={formatMoney(data.baseSalary)}
            isEmpty={!data.baseSalary}
            onClick={() => setEditing(editing === "salary" ? null : "salary")}
          />
          <StatCard
            icon={TrendingUp}
            label="Equity"
            value={data.equity?.amount ? `${data.equity.amount}%` : "—"}
            subValue={
              data.equity?.type !== "none"
                ? data.equity?.type?.toUpperCase()
                : "None"
            }
            isEmpty={!data.equity?.amount}
            onClick={() => setEditing(editing === "equity" ? null : "equity")}
          />
          <StatCard
            icon={Gift}
            label="Bonus"
            value={totalBonus > 0 ? formatMoney(totalBonus) : "—"}
            subValue={
              data.bonus?.signing && data.bonus?.annual
                ? `${formatMoney(data.bonus.signing)} signing · ${formatMoney(data.bonus.annual)} annual`
                : data.bonus?.signing
                  ? `${formatMoney(data.bonus.signing)} signing`
                  : data.bonus?.annual
                    ? `${formatMoney(data.bonus.annual)} annual`
                    : undefined
            }
            isEmpty={!totalBonus}
            onClick={() => setEditing(editing === "bonus" ? null : "bonus")}
          />
        </div>

        {/* Inline editors */}
        {editing === "salary" && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5" /> Base Salary
              </p>
              <Input
                autoFocus
                type="number"
                value={data.baseSalary ?? ""}
                onChange={(e) =>
                  updateData((p) => ({
                    ...p,
                    baseSalary: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  }))
                }
                placeholder="e.g. 120000"
                className="text-sm max-w-56"
              />
            </div>
          </>
        )}

        {editing === "equity" && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" /> Equity
              </p>
              <div className="flex items-center gap-2">
                <Select
                  value={data.equity?.type ?? ""}
                  onValueChange={(v) =>
                    updateData((p) => ({
                      ...p,
                      equity: {
                        ...p.equity,
                        type: v as NonNullable<IOfferData["equity"]>["type"],
                      },
                    }))
                  }
                >
                  <SelectTrigger className="h-8 w-36 text-sm">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {equityTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value!}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative max-w-32">
                  <Input
                    type="number"
                    value={data.equity?.amount ?? ""}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        equity: {
                          ...p.equity,
                          amount: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        },
                      }))
                    }
                    placeholder="Amount"
                    className="text-sm pr-7"
                  />
                  <Percent className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </>
        )}

        {editing === "bonus" && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Gift className="h-3.5 w-3.5" /> Bonus
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Signing</p>
                  <Input
                    autoFocus
                    type="number"
                    value={data.bonus?.signing ?? ""}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        bonus: {
                          ...p.bonus,
                          signing: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        },
                      }))
                    }
                    placeholder="e.g. 10000"
                    className="text-sm w-36"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Annual</p>
                  <Input
                    type="number"
                    value={data.bonus?.annual ?? ""}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        bonus: {
                          ...p.bonus,
                          annual: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        },
                      }))
                    }
                    placeholder="e.g. 15000"
                    className="text-sm w-36"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Performance</p>
                  <Input
                    type="text"
                    value={data.bonus?.performance ?? ""}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        bonus: {
                          ...p.bonus,
                          performance: e.target.value || undefined,
                        },
                      }))
                    }
                    placeholder="e.g. Up to 20%"
                    className="text-sm w-36"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OfferOverviewPanel;
