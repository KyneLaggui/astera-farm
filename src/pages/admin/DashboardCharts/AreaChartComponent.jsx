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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select"


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
  // Assuming the format is "January-Week1", we split by "-" and take the first part
  return [...new Set(data.map((entry) => entry.timePeriod.split("-")[0]))];
};

const AreaChartComponent = ({ data, setCategory }) => { // Add setCategory as prop
  const [selectedMonth, setSelectedMonth] = useState(""); // State to store selected month

  // Get unique months for the dropdown filter
  const uniqueMonths = getUniqueMonths(data);

  // Filter data based on the selected month
  const filteredData = selectedMonth
    ? data.filter((entry) => entry.timePeriod.split("-")[0] === selectedMonth)
    : data;

  const totalEarnings = calculateTotalEarnings(filteredData); // Calculate total earnings for filtered data

  return (
    <Card>
      <CardHeader>
        {/* Displaying the total earnings beside the title */}
        <CardTitle>
          Earnings: ₱{totalEarnings.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </CardTitle>
        <CardDescription>
          Showing earnings for the selected period
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Dropdown for selecting month */}
        <div style={{ marginBottom: "1rem" }}>
          <Select onValueChange={(value) => setCategory(value)}> {/* Set category based on selection */}
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categorize By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Period</SelectLabel>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>         
        </div>
        <ChartContainer config={priceConfig}>
          <AreaChart
            data={filteredData} // Ensure the filtered data is passed correctly
            margin={{ left: 12, right: 12, bottom: 0 }}
            height={200}
          >
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={priceConfig.earnings.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={priceConfig.earnings.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
            <XAxis
              dataKey="timePeriod"
              tickLine={false}
              tickMargin={12}
              tickFormatter={(tick) => tick.slice(0, 4)} // Display only first 3 characters of the month
            />
            <Tooltip content={<ChartTooltipContent color={priceConfig.earnings.color} />} />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke={priceConfig.earnings.color}
              fillOpacity={1}
              fill="url(#colorEarnings)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AreaChartComponent;
