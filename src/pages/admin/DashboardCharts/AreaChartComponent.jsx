import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@src/components/ui/chart";
import { TrendingUp } from "lucide-react";

const priceData = [
  { month: "January", earnings: 186 },
  { month: "February", earnings: 305 },
  { month: "March", earnings: 237 },
  { month: "April", earnings: 73 },
  { month: "May", earnings: 209 },
  { month: "June", earnings: 214 },
];

const priceConfig = {
  earnings: {
    label: "Earnings",
    color: "#FFE500",
  },
};

const AreaChartComponent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Earnings</CardTitle>
      <CardDescription>
        Showing total earnings for the last 6 months
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={priceConfig}>
        <AreaChart
          accessibilityLayer
          data={priceData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="earnings"
            type="natural"
            fill="var(--color-earnings)"
            fillOpacity={0.4}
            stroke="var(--color-earnings)"
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default AreaChartComponent;
