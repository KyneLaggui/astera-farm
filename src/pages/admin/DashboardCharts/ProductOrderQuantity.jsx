import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
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
  value: {
    label: "Order Quantity",
    color: "#FFE500",
  },
};

const ProductOrderQuantity = ({ productOrderQuantity }) => {
  const [fontSize, setFontSize] = useState("14px");
  const [xFontSize, setXFontSize] = useState("12px");

  const truncateLabel = (label) => {
    return label.length > 10 ? `${label.substring(0, 11)}...` : label;
  };

  const updateFontSize = () => {
    const width = window.innerWidth;
    // Example font size logic based on screen width
    if (width < 400) {
      setFontSize("8px"); // Small screens
      setXFontSize("6px")
    } else if (width < 900) {
      setFontSize("10px"); // Medium screens
      setXFontSize("8px")
    } else {
      setFontSize("14px"); // Large screens
      setXFontSize("12px")
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
        <CardTitle>Product Order Quantity</CardTitle>
        <CardDescription>
          The bar chart shows the order quantity for each unique product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={ordersConfig} className="max-w-[500px] h-[400px]">
          <BarChart
            data={productOrderQuantity}
            margin={{ top: 20, right: 0, left: 0, bottom: 80 }} // Added space at the bottom
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="products"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              style={{ xFontSize }} // Use dynamic font size
              interval={0} // Show all labels
              angle={-45} // Rotate labels for better visibility
              textAnchor="end" // Align the rotated labels properly
              tickFormatter={truncateLabel} // Truncate long labels
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              style={{ fontSize }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="purchases" fill="var(--color-value)" radius={8}>
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

export default ProductOrderQuantity;
