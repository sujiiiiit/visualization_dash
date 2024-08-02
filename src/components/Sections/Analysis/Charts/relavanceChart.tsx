"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DataType } from "@/lib/types";

const chartConfig = {
  label: {
    color: "hsl(var(--background))",
  },
  count: {
    label: "count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export interface ComponentProps {
  articles: DataType[];
}

export default function Component({ articles }: ComponentProps) {
  const relevanceCount = articles.reduce((acc, article) => {
    if (article.relevance) {
      acc[article.relevance] = (acc[article.relevance] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  const chartData = Object.entries(relevanceCount).map(
    ([relevance, count]) => ({
      relevance: Number(relevance),
      count,
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Relavance</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 50,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="relevance"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="count" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              fill="var(--color-count)"
              radius={4}
            >
              <LabelList
                dataKey="relavance"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nobis?{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total count for the last all relavances
        </div>
      </CardFooter>
    </Card>
  );
}
