import { ITimelineEntry } from "@/lib/models/job-application";
import { BarChartDefault } from "./bar-chart-default";
import { PieChartDonut } from "./pie-chart-donut";
import { BarChartHorizontal } from "./bar-chart-horizontal";

const ChartWrapper = ({ timeline }: { timeline: ITimelineEntry[] }) => {
  return (
    <div className="w-full flex gap-3 items-center justify-between">
      <BarChartDefault timeline={timeline} />
      <PieChartDonut timeline={timeline} />
      <BarChartHorizontal timeline={timeline} />
    </div>
  );
};

export default ChartWrapper;
