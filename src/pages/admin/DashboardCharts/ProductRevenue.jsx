import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu"
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
import ProductFilter from "@src/components/admin/ProductFilter";

const ordersConfig = {
  value: {
    label: "Order Quantity",
    color: "#FFE500",
  },
};

const ProductRevenue = ({ productRevenue }) => {
  const [filteredData, setFilteredData] = useState(productRevenue);
  const [fontSize, setFontSize] = useState("14px");
  const [xFontSize, setXFontSize] = useState("12px");

  const truncateLabel = (label) => label.length > 10 ? `${label.substring(0, 11)}...` : label;

  const updateFontSize = () => {
    const width = window.innerWidth;
    if (width < 400) {
      setFontSize("8px");
      setXFontSize("6px");
    } else if (width < 900) {
      setFontSize("10px");
      setXFontSize("8px");
    } else {
      setFontSize("14px");
      setXFontSize("12px");
    }
  };

  const handleFilterChange = (selectedProducts) => {
    if (selectedProducts.length > 0) {
      setFilteredData(productRevenue.filter((item) => selectedProducts.includes(item.name)));
    } else {
      setFilteredData(productRevenue);
    }
  };

  const filterOptions = productRevenue.map((item) => {    
      return {'key': item.name, 'value': item.name}
    }
  );

  useEffect(() => {
    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-[6px]">
          <CardTitle>Product Revenue</CardTitle>
          <CardDescription>The bar chart shows the revenue from each unique product.</CardDescription>
        </div>
        <ProductFilter values={filterOptions} onFilterChange={handleFilterChange} />
      </CardHeader>
      <CardContent>
        <ChartContainer config={ordersConfig} className="max-w-full h-[400px]">
          <BarChart
            data={filteredData.length ? filteredData : productRevenue}
            margin={{ top: 20, right: 0, left: 0, bottom: 80 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              style={{ xFontSize }}
              interval={0}
              angle={-45}
              textAnchor="end"
              tickFormatter={truncateLabel}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              style={{ fontSize }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-value)" radius={8}>
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


export default ProductRevenue;
