import React, { useEffect, useState, useRef } from "react";
import { Label, Pie, PieChart, LabelList } from "recharts";
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
    label: "Product",
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

const TopProductPieChart = ({ productsData }) => {
  const [innerRadius, setInnerRadius] = useState(70);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const updateInnerRadius = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
        if (containerWidth > 550) {
          setInnerRadius(100);
        } else if (containerWidth < 550 && containerWidth >= 400) {
          setInnerRadius(80);
        } else {
          setInnerRadius(60);
        }
      }
    };

    updateInnerRadius();
    window.addEventListener("resize", updateInnerRadius);

    return () => {
      window.removeEventListener("resize", updateInnerRadius);
    };
  }, []);

  const productsDataWithColors = productsData.map((item, index) => ({
    ...item,
    fill:
      sellingConfig.colors[index] ||
      sellingConfig.colors[sellingConfig.colors.length - 1],
  }));

  // Calculate the total number of statuses
  const totalQuantity = productsData.reduce(
    (total, item) => total + item.purchases,
    0
  );

  // const renderCustomizedLabel = (props) => {
  //   const { x, y, width, height, value } = props;
  //   const radius = 10;
  
  //   return (
  //     <g>
  //       <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
  //       <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
  //         {value.split(' ')[1]}
  //       </text>
  //     </g>
  //   );
  // };

  return (
    <Card className="w-full" ref={chartContainerRef}>
      <CardHeader className="pb-0">
        <CardTitle>Top 5 Products</CardTitle>
        <CardDescription>
          The chart shows the top most frequently bought products.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={sellingConfig}
          className="mx-auto aspect-square"
        >
          <PieChart>           
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={productsDataWithColors}
              dataKey="purchases"
              nameKey="products"
              innerRadius={innerRadius}
              strokeWidth={1}
              stroke="#455700"
            >             
              {/* Add LabelList here to display status names */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        fill="var(--color-text)"
                        className="font-medium text-lg fill-foreground"
                      >
                        {totalQuantity}
                      </text>
                    );
                  }
                  return null;
                }}
              />          
              <LabelList dataKey="purchases" offset={1} /> 

            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopProductPieChart;
