import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@src/components/ui/chart";
import { Button } from "@src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";

const priceConfig = {
  earnings: {
    label: "Earnings",
    color: "#FFE500",
  },
};

// Function to calculate total earnings
const calculateTotalEarnings = (data) => {
  return data.reduce((total, entry) => total + (entry.earnings || 0), 0);
};

// Function to get unique months from the data
const getUniqueMonths = (data) => {
  return [...new Set(data.map((entry) => entry.timePeriod.split("-")[0]))];
};

const AreaChartComponent = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState(""); // State to store selected month

  // Get unique months for the dropdown filter
  const uniqueMonths = getUniqueMonths(data);

  // Filter data based on the selected month
  const filteredData = selectedMonth
    ? data.filter((entry) => entry.timePeriod.split("-")[0] === selectedMonth)
    : data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings</CardTitle>
        <CardDescription>Showing earnings for the selected period</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Dropdown for selecting month */}
        <div style={{ marginBottom: "1rem" }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter by Month</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Month</DropdownMenuLabel>
              {uniqueMonths.map((month) => (
                <DropdownMenuCheckboxItem
                  key={month}
                  checked={selectedMonth === month}
                  onCheckedChange={() => {
                    setSelectedMonth(selectedMonth === month ? "" : month);
                  }}
                >
                  {month}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ChartContainer config={priceConfig}>
          <AreaChart
            data={filteredData} // Ensure the filtered data is passed correctly
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timePeriod" // Ensure this matches the 'timePeriod' key in data
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="earnings"
              type="monotone"
              fill="#FFE500"
              fillOpacity={0.4}
              stroke="#FFE500"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AreaChartComponent;
