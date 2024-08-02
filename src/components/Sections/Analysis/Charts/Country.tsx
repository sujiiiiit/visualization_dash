"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DataType } from "@/lib/types";

const rangeColors: { [key: string]: string } = {
  "1-10": "hsl(var(--chart-1))",
  "11-20": "hsl(var(--chart-2))",
  "21-30": "hsl(var(--chart-3))",
  "31-40": "hsl(var(--chart-4))",
  "41-50": "hsl(var(--chart-5))",
  "51-60": "hsl(var(--chart-6))",
  // Add more ranges and colors as needed
};

const chartConfig = Object.fromEntries(
  Object.entries(rangeColors).map(([range, color]) => [
    range,
    {
      label: `Intensity ${range}`,
      color: color,
    },
  ])
);

interface Article {
  intensity: number;
}

const groupIntensities = (intensities: number[]) => {
  const grouped: { [range: string]: number } = {};
  intensities.forEach((intensity) => {
    if (intensity === 0) return; // Skip intensity 0 if it's not needed
    const rangeStart = Math.floor((intensity - 1) / 10) * 10 + 1;
    const rangeEnd = rangeStart + 9;
    const range = `${rangeStart}-${rangeEnd}`;
    if (!grouped[range]) {
      grouped[range] = 0;
    }
    grouped[range]++;
  });
  return grouped;
};

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function Component({ articles }: { articles: DataType[] }) {
  const intensities = articles.map((article: Article) => article.intensity);
  const groupedIntensities = groupIntensities(intensities);
  const newData = Object.entries(groupedIntensities).map(([range, count]) => ({
    range,
    count,
    fill: chartConfig[range]?.color || generateRandomColor(), // Use color from config or random
  }));


  return (
    <Card className="flex flex-col md:w-auto w-full">
      <CardHeader className="text-center pb-0">
        <CardTitle>Intensity in Range</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={newData}
              dataKey="count"
              nameKey="range"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                          {/* Display total count if needed */}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Intensity
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total count of intensities in a range
        </div>
      </CardFooter>
    </Card>
  );
}
