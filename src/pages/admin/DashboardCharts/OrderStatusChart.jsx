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

const ordersChart = [
  { orderStatus: "Order Placed", orders: 186 },
  { orderStatus: "Processing", orders: 305 },
  { orderStatus: "Shipped", orders: 237 },
  { orderStatus: "Delivered", orders: 73 },
];

const ordersConfig = {
  orders: {
    label: "Orders",
    color: "#FFE500",
  },
};

const OrderStatusChart = () => (
  <Card className="">
    <CardHeader>
      <CardTitle>Order Status</CardTitle>
      <CardDescription>
        Your order status provides real-time updates on the progress of your
        purchase, from confirmation to delivery.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={ordersConfig}>
        <BarChart accessibilityLayer data={ordersChart} margin={{ top: 20 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="orderStatus"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="orders" fill="var(--color-orders)" radius={8}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default OrderStatusChart;
