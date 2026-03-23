"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { format } from "date-fns";

export const description = "A bar chart showing the number of events per day.";

const chartConfig = {
  events: {
    label: "Events",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

function buildChartData(timeline: ITimelineEntry[]) {
  const map = new Map<string, number>();
  for (const entry of timeline) {
    const key = format(new Date(entry.date), "MMM d");
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  return Array.from(map.entries()).map(([day, events]) => ({ day, events }));
}

export function BarChartDefault({ timeline }: { timeline: ITimelineEntry[] }) {
  const chartData = buildChartData(timeline);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Activity Over Time</CardTitle>
        <CardDescription>Number of events per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="events" fill="#f59e0b" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
