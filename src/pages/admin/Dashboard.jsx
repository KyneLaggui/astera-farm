import { useState, useEffect, useMemo } from "react"; 
import OrderStatusChart from "@src/pages/admin/DashboardCharts/OrderStatusChart";
import AreaChartComponent from "@src/pages/admin/DashboardCharts/AreaChartComponent";
import BestSellingChart from "@src/pages/admin/DashboardCharts/BestSellingChart";
import { selectOrders } from "@src/redux/slice/ordersSlice";
import { useSelector } from "react-redux";
import { format, getWeek, differenceInDays, differenceInWeeks, getMonth, getYear } from "date-fns";
import LoggedInOnly from "@src/layouts/LoggedInOnly";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";

const Dashboard = () => {
  const [sellingData, setSellingData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("week"); // Add state for selected category

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
      };
    });
  }, [orders]);

  useEffect(() => {
    if (filteredOrders.length === 0) return;

    const { productSales, statusCount, totalOrders } = filteredOrders.reduce(
      (acc, order) => {
        order.products.forEach((product) => {
          acc.productSales[product.name] = (acc.productSales[product.name] || 0) + product.quantity;
        });
        acc.statusCount[order.status] = (acc.statusCount[order.status] || 0) + 1;
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

  const totalEarnings = filteredOrders.reduce(
    (acc, order) => acc + order.totalEarnings,
    0
  );

  const totalProductsSold = filteredOrders.reduce((acc, order) => {
    return acc + order.products.reduce((sum, product) => sum + product.quantity, 0);
  }, 0);

  return (
    <LoggedInOnly forAdmin={true} forUser={false}>
      <div className="navbar-spacing flex flex-col items-center justify-center gap-4 sm:gap-8 max-w-3xl mx-auto">
        <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
          DASHBOARD
        </h1>
        <div className="flex sm:flex-row gap-4 w-full justify-center flex-wrap">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
              <CardDescription className="text-yellow">₱{totalEarnings.toLocaleString()}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
              <CardDescription className="text-yellow">{filteredOrders.length}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Products Sold</CardTitle>
              <CardDescription className="text-yellow">{totalProductsSold}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <div className="flex-grow md:min-w-[330px]"> {/* Set a minimum width for the chart */}
            <BestSellingChart sellingData={sellingData} />
          </div>
          <div className="flex flex-col gap-4 justify-between w-full">
            {/* Pass selectedCategory as a prop to AreaChartComponent */}
            <AreaChartComponent data={chartData} setCategory={setSelectedCategory} />
            <OrderStatusChart statusData={statusData} />
          </div>
        </div>
      </div>
    </LoggedInOnly>
  );
};

export default Dashboard;
