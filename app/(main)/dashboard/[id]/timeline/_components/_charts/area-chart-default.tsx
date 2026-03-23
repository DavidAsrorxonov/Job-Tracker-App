"use client";

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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  total: {
    label: "Total Events",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

function buildCumulativeData(timeline: ITimelineEntry[]) {
  const sorted = [...timeline].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let running = 0;
  const map = new Map<string, number>();

  for (const entry of sorted) {
    const key = format(new Date(entry.date), "MMM d");
    running++;
    map.set(key, running);
  }

  return Array.from(map.entries()).map(([day, total]) => ({ day, total }));
}

const AreaChartDefault = ({ timeline }: { timeline: ITimelineEntry[] }) => {
  const chartData = buildCumulativeData(timeline);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative Activity</CardTitle>
        <CardDescription>Running total of events over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="total"
              type="natural"
              fill="#f59e0b"
              fillOpacity={0.2}
              stroke="#92400e"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AreaChartDefault;
