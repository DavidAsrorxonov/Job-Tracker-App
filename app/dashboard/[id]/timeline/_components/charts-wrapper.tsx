import { ITimelineEntry } from "@/lib/models/job-application";
import { BarChartDefault } from "./_charts/bar-chart-default";
import { PieChartDonut } from "./_charts/pie-chart-donut";
import { RadarChartDefault } from "./_charts/radar-chart";
import AreaChartDefault from "./_charts/area-chart-default";

const ChartWrapper = ({ timeline }: { timeline: ITimelineEntry[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      <BarChartDefault timeline={timeline} />
      <PieChartDonut timeline={timeline} />
      <RadarChartDefault timeline={timeline} />
      <AreaChartDefault timeline={timeline} />
    </div>
  );
};

export default ChartWrapper;
