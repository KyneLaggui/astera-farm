import React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@src/components/ui/chart";

const sellingConfig = {
  purchases: {
    label: "Status",
  },
  colors: [
    "#fff889",
    "#ffeb39",
    "#fddc12",
    "#ecc106",
    "#cc9702",
    "#a36b05",
    "#86540d",
    "#724511",
    "#432405",
  ],
};

const OrderStatusChart = ({ statusData }) => {
  // Map the sorted data to dynamically assign colors
  const statusDataWithColors = statusData.map((item, index) => ({
    ...item,
    fill:
      sellingConfig.colors[index] ||
      sellingConfig.colors[sellingConfig.colors.length - 1], // Assign color based on position, fallback to last color if more than colors available
  }));

  // Calculate the total number of statuses
  const totalStatuses = statusData.reduce((total, item) => total + item.count, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Order Status</CardTitle>
        <CardDescription>Showing the status distribution of orders</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={sellingConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={statusDataWithColors}
              dataKey="count"
              nameKey="status"
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
                        fill="var(--color-text)"
                        className="font-sans font-medium fill-foreground"
                      >
                        {totalStatuses}
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;
