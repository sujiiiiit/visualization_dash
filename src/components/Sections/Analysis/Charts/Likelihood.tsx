"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DataType } from "@/lib/types"

export interface ComponentProps {
  articles: DataType[];
}

export default function Component({ articles }: ComponentProps) {
  const likelihoodCount = articles.reduce((acc, article) => {
    if (article.likelihood) {
      acc[article.likelihood] = (acc[article.likelihood] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  const chartData = Object.entries(likelihoodCount).map(([likelihood, count], index) => ({
    likelihood: `Likelihood ${likelihood}`,
    count,
    fill: `var(--color-${index + 1})`,
  }));

  const chartConfig: ChartConfig = {
    likelihood: {
      label: "Likelihood",
    },
  };

  Object.keys(likelihoodCount).forEach((likelihood, index) => {
    chartConfig[`${index + 1}`] = {
      label: `Likelihood ${likelihood}`,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Likelihood</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" label nameKey="likelihood" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Lorem ipsum dolor sit amet consectetur adipisicing.<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total count of each likelihoods 
        </div>
      </CardFooter>
    </Card>
  );
}
