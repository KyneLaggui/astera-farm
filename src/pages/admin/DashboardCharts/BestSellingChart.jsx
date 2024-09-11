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
    label: "Purchases",
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

const BestSellingChart = ({ sellingData }) => {
  // Sort the selling data based on purchases (highest to lowest)
  const sortedSellingData = [...sellingData].sort(
    (a, b) => b.purchases - a.purchases
  );

  // Map the sorted data to dynamically assign colors
  const sellingDataWithColors = sortedSellingData.map((item, index) => ({
    ...item,
    fill:
      sellingConfig.colors[index] ||
      sellingConfig.colors[sellingConfig.colors.length - 1], // Assign color based on position, fallback to last color if more than colors available
  }));

  // Calculate the total number of products sold
  const totalPurchases = sellingData.reduce((total, item) => total + item.purchases, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Showing best-selling products</CardDescription>
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
              data={sellingDataWithColors}
              dataKey="purchases"
              nameKey="products"
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
                          {totalPurchases}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Products Sold
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
    </Card>
  );
};

export default BestSellingChart;
