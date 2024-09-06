import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

export const description = "A bar chart with a label";

const chartData = [
  { orderStatus: "Order Placed", orders: 186 },
  { orderStatus: "Processing", orders: 305 },
  { orderStatus: "Shipped", orders: 237 },
  { orderStatus: "Delivered", orders: 73 },
];

const chartConfig = {
  orders: {
    label: "Orders",
    color: "#FFE500",
  },
};

const Dashboard = () => {
  return (
    <div className="navbar-spacing flex flex-col justify-center items-center gap-4 sm:gap-8">
      <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
        DASHBOARD
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 sm:max-h-[400px] ">
        {/* Left Container */}
        <Card className="max-w-[500px] flex-grow">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>
              Your order status provides real-time updates on the progress of
              your purchase, from confirmation to delivery.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                }}
              >
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
          {/* <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter> */}
        </Card>

        {/* Right Container */}
        <div className="flex flex-col gap-4 justify-between ">
          <Card className="flex-1">
            {/* <CardTitle></CardTitle>
            <CardDescription></CardDescription> */}
            <CardContent className="px-4 py-4 flex flex-col justify-evenly min-w-[200px] h-full">
              <h1 className="text-3xl font-semibold">Earnings</h1>
              <p className="text-2xl text-yellow font-medium">₱10,000</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            {/* <CardTitle></CardTitle>
            <CardDescription></CardDescription> */}
            <CardContent className="px-4 py-4 flex flex-col justify-evenly min-w-[200px] h-full">
              <h1 className="text-3xl font-semibold">Products</h1>
              <p className="text-2xl font-medium text-yellow">22</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            {/* <CardTitle></CardTitle>
            <CardDescription></CardDescription> */}
            <CardContent className="px-4 py-4 flex flex-col justify-evenly min-w-[200px] h-full">
              <h1 className="text-3xl font-semibold">Orders</h1>
              <p className="text-2xl font-medium text-yellow">10</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
