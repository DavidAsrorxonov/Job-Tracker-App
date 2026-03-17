"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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

const chartConfig = {
  count: {
    label: "Events",
    color: "#016238",
  },
} satisfies ChartConfig;

function buildRadarData(timeline: ITimelineEntry[]) {
  const counts: Record<string, number> = {
    status_change: 0,
    interview: 0,
    follow_up: 0,
    other: 0,
  };

  for (const entry of timeline) {
    if (entry.type in counts) {
      counts[entry.type]++;
    }
  }

  return [
    { type: "Stage Changes", count: counts.status_change },
    { type: "Interviews", count: counts.interview },
    { type: "Follow-ups", count: counts.follow_up },
    { type: "Other", count: counts.other },
  ];
}

export function RadarChartDefault({
  timeline,
}: {
  timeline: ITimelineEntry[];
}) {
  const radarData = buildRadarData(timeline);

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Activity Intensity</CardTitle>
        <CardDescription>Event count by activity type</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full aspect-square max-h-62.5"
        >
          <RadarChart data={radarData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="type" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="#016238"
              fillOpacity={0.5}
              stroke="#016238"
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
