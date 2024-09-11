import React, { useState, useEffect } from "react";
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
    label: "Orders",
    color: "#FFE500",
  },
};

const OrderStatusChart = ({ orderData }) => {
  const [ordersChart, setOrdersChart] = useState([
    { orderStatus: "Order Placed", orders: 0 },
    { orderStatus: "Processing", orders: 0 },
    { orderStatus: "Shipped", orders: 0 },
    { orderStatus: "Delivered", orders: 0 },
  ]);

  useEffect(() => {
    if (orderData.length > 0) {
      // Initialize status count
      const statusCount = {
        "Order Placed": 0,
        Processing: 0,
        Shipped: 0,
        Delivered: 0,
      };

      // Count orders by status
      orderData.forEach((order) => {
        if (statusCount[order.status] !== undefined) {
          statusCount[order.status]++;
        }
      });

      // Update ordersChart state with the counts
      setOrdersChart([
        { orderStatus: "Order Placed", orders: statusCount["Order Placed"] },
        { orderStatus: "Processing", orders: statusCount["Processing"] },
        { orderStatus: "Shipped", orders: statusCount["Shipped"] },
        { orderStatus: "Delivered", orders: statusCount["Delivered"] },
      ]);
    }
  }, [orderData]);

  return (
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
};

export default OrderStatusChart;
