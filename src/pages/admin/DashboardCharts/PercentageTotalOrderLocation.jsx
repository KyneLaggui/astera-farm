import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { LabelList, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@src/components/ui/chart";

// Define your colors for each category
const categoryColors = [
  "#475900",  // Example color 1 (base)
  "#FFEB39",  // Example color 2 (base)
  "#FFE500",  // Example color 3 (base)
  "#4F6900",  // Darker shade of #475900
  "#7B8E00",  // Lighter shade of #475900
  "#C2D600",  // Lighter shade of #475900
  "#FFE600",  // Darker shade of #FFE500
  "#FFDC00",  // Lighter shade of #FFE500
  "#E4C800",  // Muted shade of #FFE500
  "#C9B700",  // Slightly darker shade of #FFEB39
  "#FFAB00",  // Lighter yellow from #FFEB39
  "#A8B700",  // Muted shade of #FFEB39
  "#D5A500",  // Lighter and warmer shade of #FFEB39
  "#FFE63B",  // Very bright yellow, almost like #FFEB39
];

const chartConfig = {
  orders: {
    label: "Orders by City",
  },
};

const PercentageTotalOrderLocation = ({ data }) => {
  // Calculate total orders
  const totalOrders = data.reduce((sum, cityData) => sum + cityData.frequency, 0);

  // Map the input data to match the chart requirements and calculate percentages
  const chartData = data.map((cityData, index) => ({
    city: cityData.city,
    orders: cityData.frequency,
    percentage: ((cityData.frequency / totalOrders) * 100).toFixed(1), // Calculate percentage with 1 decimal place
    fill: categoryColors[index % categoryColors.length], // Assign color based on index
  }));

  // Custom label rendering function
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, index }) => {
    const cityName = chartData[index].city;
    const percentage = chartData[index].percentage;

    // Adjust label distance
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30; // Move the label 30px away from the outerRadius
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor={x > cx ? "start" : "end"} // Align label direction based on position
        dominantBaseline="central"
        fontSize="14px"
        className="font-medium"
      >
        {`${percentage}%`} {/* Display city name and percentage */}
      </text>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardTitle>Order Location Distribution</CardTitle>
        <CardDescription>
          The chart shows the percentage of total orders by location.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[650px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="orders"
              nameKey="city"
              label={renderCustomizedLabel} // Use custom label for displaying percentages        
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PercentageTotalOrderLocation;

