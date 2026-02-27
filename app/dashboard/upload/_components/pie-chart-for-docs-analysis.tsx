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
import { Label, Pie, PieChart } from "recharts";

type Counts = {
  cv: number;
  coverLetter: number;
};

export default function PieChartForDocsAnalysis({
  counts,
}: {
  counts: Counts;
}) {
  const chartData = [
    { name: "cv", count: counts.cv, fill: "#3ECF8E" },
    {
      name: "coverLetter",
      count: counts.coverLetter,
      fill: "#2CB67D",
    },
  ];

  const chartConfig = {
    cv: { label: "CV" },
    coverLetter: { label: "Cover Letter" },
  } satisfies ChartConfig;

  const total = counts.cv + counts.coverLetter;

  return (
    <Card className="flex flex-col max-w-xl">
      <CardHeader className="pb-0">
        <CardTitle>Documents breakdown</CardTitle>
        <CardDescription>CV vs Cover Letter</CardDescription>
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
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox))
                    return null;

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy as number) + 24}
                        className="fill-muted-foreground text-sm"
                      >
                        Total docs
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
