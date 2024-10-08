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

  const statusDataWithColors = statusData.map((item, index) => ({
    ...item,
    fill:
      sellingConfig.colors[index] ||
      sellingConfig.colors[sellingConfig.colors.length - 1],
  }));

  // Calculate the total number of statuses
  const totalStatuses = statusData.reduce(
    (total, item) => total + item.count,
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
        <CardTitle>Order Status</CardTitle>
        <CardDescription>
          Showing the status distribution of orders
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
              data={statusDataWithColors}
              dataKey="count"
              nameKey="status"
              innerRadius={innerRadius}
              // strokeWidth={1}
              // stroke="#455700"
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
                        {totalStatuses}
                      </text>
                    );
                  }
                  return null;
                }}
              />          
              {/* <LabelList dataKey="status" offset={1} /> */}

            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;
