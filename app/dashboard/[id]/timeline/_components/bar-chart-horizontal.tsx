"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { differenceInDays } from "date-fns";

export const description =
  "A horizontal bar chart showing the duration of each stage.";

const chartConfig = {
  days: {
    label: "Days",
    color: "#016238",
  },
} satisfies ChartConfig;

function buildStageDurationData(timeline: ITimelineEntry[]) {
  const statusChanges = timeline
    .filter((e) => e.type === "status_change")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return statusChanges.map((entry, index) => {
    const next = statusChanges[index + 1];
    const days = next
      ? differenceInDays(new Date(next.date), new Date(entry.date))
      : differenceInDays(new Date(), new Date(entry.date));

    return {
      stage: entry.action,
      days,
    };
  });
}

export function BarChartHorizontal({
  timeline,
}: {
  timeline: ITimelineEntry[];
}) {
  const stageDurationData = buildStageDurationData(timeline);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stage Duration</CardTitle>
        <CardDescription>Days spent in each stage</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={stageDurationData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="days" hide />
            <YAxis
              dataKey="stage"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="days" fill="var(--color-days)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
