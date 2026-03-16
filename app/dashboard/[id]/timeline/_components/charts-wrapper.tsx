import { ITimelineEntry } from "@/lib/models/job-application";
import { BarChartDefault } from "./bar-chart-default";
import { PieChartDonut } from "./pie-chart-donut";
import { RadarChartDefault } from "./radar-chart";

const ChartWrapper = ({ timeline }: { timeline: ITimelineEntry[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
      <BarChartDefault timeline={timeline} />
      <PieChartDonut timeline={timeline} />
      <RadarChartDefault timeline={timeline} />
    </div>
  );
};

export default ChartWrapper;
