import { useState, useEffect, useMemo } from "react";
import OrderStatusChart from "@src/pages/admin/DashboardCharts/OrderStatusChart";
import AreaChartComponent from "@src/pages/admin/DashboardCharts/AreaChartComponent";
import BestSellingChart from "@src/pages/admin/DashboardCharts/BestSellingChart";
import TopCitiesChart from "@src/pages/admin/DashboardCharts/TopCitiesChart";
import { selectOrders } from "@src/redux/slice/ordersSlice";
import { useSelector } from "react-redux";
import { format, getWeek, getYear } from "date-fns";
import LoggedInOnly from "@src/layouts/LoggedInOnly";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import ImageUpload from "@src/components/admin/imageUpload/ImageUpload";

const Dashboard = () => {
  const [sellingData, setSellingData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("week");
  const [topCitiesData, setTopCitiesData] = useState([]); // State for top cities data

  const orders = useSelector(selectOrders);

  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    return orders.map((order) => {
      const totalEarnings = order.cart.reduce(
        (acc, product) => acc + product.amount * product.quantity,
        0
      );

      return {
        orderId: order.id,
        status: order.status,
        totalEarnings,
        createdAt: order.createdAt,
        products: order.cart,
        city: order.shippingAddress.city, // Assuming city is part of the order object
      };
    });
  }, [orders]);

  useEffect(() => {
    if (filteredOrders.length === 0) return;

    const { productSales, statusCount, totalOrders } = filteredOrders.reduce(
      (acc, order) => {
        order.products.forEach((product) => {
          acc.productSales[product.name] =
            (acc.productSales[product.name] || 0) + product.quantity;
        });
        acc.statusCount[order.status] =
          (acc.statusCount[order.status] || 0) + 1;
        acc.totalOrders += 1;
        return acc;
      },
      { productSales: {}, statusCount: {}, totalOrders: 0 }
    );

    const sellingDataArray = Object.entries(productSales)
      .map(([name, purchases]) => ({ products: name, purchases }))
      .sort((a, b) => b.purchases - a.purchases)
      .slice(0, 3);

    const statusDataArray = Object.entries(statusCount).map(
      ([status, count]) => ({ status, count })
    );

    // Calculate top cities based on order frequency
    const cityFrequency = filteredOrders.reduce((acc, order) => {
      acc[order.city] = (acc[order.city] || 0) + 1; // Increment count for the city
      return acc;
    }, {});

    const topCities = Object.entries(cityFrequency)
      .map(([city, frequency]) => ({ city, frequency }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5); // Get top 5 cities

    setTopCitiesData(topCities); // Update state with top cities data

    const groupByDate = filteredOrders.reduce((acc, order) => {
      const orderDate = new Date(order.createdAt * 1000);
      let key;
      switch (selectedCategory) {
        case "week":
          key = `Week ${getWeek(orderDate)}`;
          break;
        case "month":
          key = `${format(orderDate, "MMMM")} ${getYear(orderDate)}`;
          break;
        case "year":
          key = `${getYear(orderDate)}`;
          break;
        default:
          key = format(orderDate, "yyyy-MM-dd");
      }

      acc[key] = (acc[key] || 0) + order.totalEarnings;
      return acc;
    }, {});

    const chartDataArray = Object.entries(groupByDate)
      .map(([period, earnings]) => ({ timePeriod: period, earnings }))
      .sort((a, b) => new Date(a.timePeriod) - new Date(b.timePeriod));

    setSellingData(sellingDataArray);
    setChartData(chartDataArray);
    setStatusData(statusDataArray);
  }, [filteredOrders, selectedCategory]);

  const totalEarnings = filteredOrders
    .reduce((acc, order) => acc + order.totalEarnings, 0)
    .toFixed(2); // Ensure total earnings is a decimal with 2 places

  const totalProductsSold = filteredOrders.reduce((acc, order) => {
    return (
      acc + order.products.reduce((sum, product) => sum + product.quantity, 0)
    );
  }, 0);

  const averageOrderRevenue =
    filteredOrders.length > 0
      ? (totalEarnings / filteredOrders.length).toLocaleString()
      : "₱0.00"; // Display ₱0.00 if there are no orders

  return (
    <LoggedInOnly forAdmin={true} forUser={false}>
      <div className="navbar-spacing flex flex-col items-center justify-center gap-4 sm:gap-8 max-w-6xl mx-auto">
        <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
          DASHBOARD
        </h1>
        <div className="flex sm:flex-row gap-4 w-full justify-center flex-wrap">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription className="text-yellow">
                &#8369;
                {parseFloat(totalEarnings).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
              <CardDescription className="text-yellow">
                {filteredOrders.length}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Products Sold</CardTitle>
              <CardDescription className="text-yellow">
                {totalProductsSold}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Average Revenue</CardTitle>
              <CardDescription className="text-yellow">
                &#8369;{averageOrderRevenue}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="flex flex-col gap-4 w-full justify-center flex-wrap lg:flex-nowrap">
          <div className="flex flex-col md:flex-row justify-between gap-4 w-full flex-grow">
            <div className="flex-grow flex justify-center">
              <AreaChartComponent
                data={chartData}
                setCategory={setSelectedCategory}
              />
            </div>
            <div className="flex-grow flex justify-center">
              <BestSellingChart sellingData={sellingData} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full gap-4 flex-grow">
            <div className="flex-grow flex justify-center">
              <TopCitiesChart data={topCitiesData} />
            </div>
            <div className="flex-grow flex justify-center">
              <OrderStatusChart statusData={statusData} />
            </div>
          </div>
        </div>

        <ImageUpload />
      </div>
    </LoggedInOnly>
  );
};

export default Dashboard;
