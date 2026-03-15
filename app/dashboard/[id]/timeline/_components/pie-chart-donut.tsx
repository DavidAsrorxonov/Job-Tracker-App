"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { ITimelineEntry } from "@/lib/models/job-application";

export const description =
  "A donut chart showing the distribution of activities by type.";

const typeColors: Record<string, string> = {
  status_change: "#016238",
  interview: "#3b82f6",
  follow_up: "#f59e0b",
  other: "#94a3b8",
};

const chartConfig = {
  count: {
    label: "Events",
  },
  status_change: {
    label: "Stage Change",
    color: "#016238",
  },
  interview: {
    label: "Interview",
    color: "#3b82f6",
  },
  follow_up: {
    label: "Follow-up",
    color: "#f59e0b",
  },
  other: {
    label: "Other",
    color: "#94a3b8",
  },
} satisfies ChartConfig;

function getTheTypeAndCount(timeline: ITimelineEntry[]) {
  const map = new Map<string, number>();
  for (const entry of timeline) {
    const key = entry.type;
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  return Array.from(map.entries()).map(([type, count]) => ({
    type,
    count,
    fill: typeColors[type] ?? "#94a3b8",
  }));
}

export function PieChartDonut({ timeline }: { timeline: ITimelineEntry[] }) {
  const pieChartData = getTheTypeAndCount(timeline);

  return (
    <Card className="w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Event Breakdown</CardTitle>
        <CardDescription>Distribution of activity by type</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChartData}
              dataKey="count"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
