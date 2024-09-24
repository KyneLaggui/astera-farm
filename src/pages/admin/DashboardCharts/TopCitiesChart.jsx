import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

export const description = "A mixed bar chart";

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to create dynamic chart configuration and transform data
const createChartConfigAndTransformData = (data) => {
  const cityFrequencyMap = {};

  // Accumulate frequency for each city
  data.forEach(item => {
    if (cityFrequencyMap[item.city]) {
      cityFrequencyMap[item.city] += item.frequency;
    } else {
      cityFrequencyMap[item.city] = item.frequency;
    }
  });

  const uniqueCities = Object.keys(cityFrequencyMap);
  const transformedData = uniqueCities.map(city => ({
    city,
    frequency: cityFrequencyMap[city],
  }));

  const config = {};
  uniqueCities.forEach(city => {
    config[city] = {
      label: city,
      color: getRandomColor(), // Assign a random color for each city
    };
  });

  return { config, transformedData }; // Return only config and transformedData
};

const TopCitiesChart = ({ data }) => {
  const { config, transformedData } = createChartConfigAndTransformData(data);
  console.log('transformedData', transformedData)
  console.log('config', config)

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Top Cities</CardTitle>
        <CardDescription>The bar chart shows the top cities that have the most orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={transformedData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="city"
              type="category"
              tickFormatter={(value) => value}
            />
            <XAxis type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Render Bars for each city in the transformed data */}
            <Bar dataKey="frequency" layout="vertical" radius={5} fill={'#FFE500'}/>
            
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};


export default TopCitiesChart;
