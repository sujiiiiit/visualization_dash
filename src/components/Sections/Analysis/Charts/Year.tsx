// components/Sections/Analysis/Charts/Year.tsx
import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { DataType } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Selectyear } from "./SelectYear";

const chartConfig = {
  startYear: {
    label: "Start Year",
    color: "hsl(var(--chart-1))",
  },
  endYear: {
    label: "End Year",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface YearChartProps {
  articles: DataType[];
}

const YearChart: React.FC<YearChartProps> = ({
  articles,
}) => {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  const aggregatedData: Record<string, { startYear: number; endYear: number }> =
    {};

  articles.forEach((item) => {
    const startYear = item.start_year;
    const endYear = item.end_year;

    if (startYear) {
      if (!aggregatedData[startYear]) {
        aggregatedData[startYear] = { startYear: 0, endYear: 0 };
      }
      aggregatedData[startYear].startYear += 1; // Increment count for start_year
    }

    if (endYear) {
      if (!aggregatedData[endYear]) {
        aggregatedData[endYear] = { startYear: 0, endYear: 0 };
      }
      aggregatedData[endYear].endYear += 1; // Increment count for end_year
    }
  });

  // Convert the aggregated data to an array and sort by year
  const sortedYears = Object.keys(aggregatedData)
    .map((year) => ({
      year: year,
      startYear: aggregatedData[year].startYear,
      endYear: aggregatedData[year].endYear,
    }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  // Generate year ranges for the select menu (10 years per range)
  const rangeOptions = sortedYears.reduce<string[]>((acc, _, index) => {
    if (index % 10 === 0) {
      const startYear = sortedYears[index].year;
      const endYear =
        sortedYears[Math.min(index + 9, sortedYears.length - 1)].year;
      acc.push(`${startYear}-${endYear}`);
    }
    return acc;
  }, []);

  // Get data for selected range
  const selectedYears = selectedRange
    ? selectedRange.split("-").map(Number)
    : [
        sortedYears[0]?.year,
        sortedYears[Math.min(9, sortedYears.length - 1)]?.year,
      ];

  const chartData = sortedYears.filter(
    (data) =>
      Number(data.year) >= Number(selectedYears[0]) &&
      Number(data.year) <= Number(selectedYears[1])
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col gap-1">
            <CardTitle>Year Wise Chart</CardTitle>
            <CardDescription>
              Showing total blogs for the selected years
            </CardDescription>
          </div>

          <Selectyear options={rangeOptions} onChange={setSelectedRange} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
           
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillstartYear" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-startYear)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-startYear)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillendYear" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-endYear)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-endYear)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="endYear"
              type="natural"
              fill="url(#fillendYear)"
              fillOpacity={0.4}
              stroke="var(--color-endYear)"
              stackId="b"
            />
            <Area
              dataKey="startYear"
              type="natural"
              fill="url(#fillstartYear)"
              fillOpacity={0.4}
              stroke="var(--color-startYear)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default YearChart;
