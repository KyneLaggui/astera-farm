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
    label: "Purchases",
    color: "#FFE500",
  },
};

const BestSellingChart = ({ sellingData }) => {
  const [fontSize, setFontSize] = useState("14px");

  const truncateLabel = (label) => {
    return label.length > 10 ? `${label.substring(0, 7)}...` : label;
  };

  const updateFontSize = () => {
    const width = window.innerWidth;
    // Example font size logic based on screen width
    if (width < 400) {
      setFontSize("8px"); // Small screens
    } else if (width < 900) {
      setFontSize("10px"); // Medium screens
    } else {
      setFontSize("14px"); // Large screens
    }
  };

  useEffect(() => {
    // Set initial font size
    updateFontSize();
    // Add resize event listener
    window.addEventListener("resize", updateFontSize);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>
          The bar chart shows the most purchased products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={ordersConfig}>
          <BarChart
            data={sellingData}
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="products"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              style={{ fontSize }} // Use dynamic font size
              interval={0} // Show all labels
              angle={0} // Rotate labels
              tickFormatter={truncateLabel} // Truncate long
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="purchases" fill="var(--color-orders)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                style={{ whiteSpace: "pre-wrap", maxWidth: "50px" }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BestSellingChart;
