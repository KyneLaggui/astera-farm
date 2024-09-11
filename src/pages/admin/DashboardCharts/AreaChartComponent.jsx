import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@src/components/ui/chart";

const priceConfig = {
  earnings: {
    label: "Earnings",
    color: "#FFE500", // You can replace this with a hardcoded value to check if this is defined properly
  },
};

const AreaChartComponent = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Earnings</CardTitle>
      <CardDescription>
        Showing earnings for the selected period
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={priceConfig}>
        <AreaChart
          data={data} // Ensure the data is passed correctly
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="timePeriod" // Ensure this matches the 'timePeriod' key in data
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <Tooltip content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="earnings"
            type="monotone"
            fill="#FFE500" // Replace var(--color-earnings) with actual value for now
            fillOpacity={0.4}
            stroke="#FFE500" // Replace var(--color-earnings) with actual value for now
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default AreaChartComponent;
