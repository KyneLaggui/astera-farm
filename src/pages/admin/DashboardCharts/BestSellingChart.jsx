import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

const ordersConfig = {
  orders: {
    label: "Purchases",
    color: "#FFE500",
  },
};

const BestSellingChart = ({ sellingData }) => {
  const truncateLabel = (label) => {
    return label.length > 10 ? `${label.substring(0, 7)}...` : label;
  };

  return (
    <Card className="h-full max-w-full">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>
          The bar chart shows the most purchased products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={ordersConfig}>
          <BarChart data={sellingData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="products"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              style={{ fontSize: '14px' }}
              interval={0} // Show all labels
              angle={0} // Rotate labels
              tickFormatter={truncateLabel} // Truncate long
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="purchases" fill="var(--color-orders)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                style={{ whiteSpace: 'pre-wrap', maxWidth: '50px' }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BestSellingChart;
