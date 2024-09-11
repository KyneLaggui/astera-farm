import { useState, useEffect } from "react";
import OrderStatusChart from "@src/pages/admin/DashboardCharts/OrderStatusChart";
import AreaChartComponent from "@src/pages/admin/DashboardCharts/AreaChartComponent";
import BestSellingChart from "@src/pages/admin/DashboardCharts/BestSellingChart";
import { selectOrders } from "@src/redux/slice/ordersSlice";
import { useSelector } from "react-redux";
import { format, getWeek, differenceInDays, differenceInWeeks } from "date-fns";

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [sellingData, setSellingData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const orders = useSelector(selectOrders); // Select orders from Redux state

  useEffect(() => {
    if (orders && orders.length > 0) {
      console.log("Orders:", orders); // Debug: Check if orders are available

      // Step 1: Calculate total earnings per order
      const filteredOrders = orders.map((order) => {
        const totalEarnings = order.cart.reduce(
          (acc, product) => acc + product.amount * product.quantity,
          0
        );

        return {
          orderId: order.id,
          status: order.status,
          totalEarnings, // Include total earnings for this order
          createdAt: order.createdAt, // Timestamp in seconds
          products: order.cart, // Assuming products are in the cart array
        };
      });

      // Step 2: Calculate total product sales for BestSellingChart
      const productSales = filteredOrders.reduce((acc, order) => {
        order.products.forEach((product) => {
          if (acc[product.name]) {
            acc[product.name] += product.quantity;
          } else {
            acc[product.name] = product.quantity;
          }
        });
        return acc;
      }, {});

      const sellingDataArray = Object.entries(productSales).map(
        ([name, purchases]) => ({
          products: name,
          purchases,
        })
      );

      // Step 3: Calculate the range of order dates to decide whether to group by day, week, or month
      const earliestOrder = new Date(
        Math.min(...filteredOrders.map((order) => order.createdAt * 1000))
      );
      const latestOrder = new Date(
        Math.max(...filteredOrders.map((order) => order.createdAt * 1000))
      );

      const totalDays = differenceInDays(latestOrder, earliestOrder);
      const totalWeeks = differenceInWeeks(latestOrder, earliestOrder);

      console.log("Date Range:", { earliestOrder, latestOrder, totalDays });

      // Step 4: Group orders by day, week, or month dynamically based on the date range
      const groupByDate = filteredOrders.reduce((acc, order) => {
        const orderDate = new Date(order.createdAt * 1000); // Convert timestamp to milliseconds
        let key;

        if (totalDays < 7) {
          // Group by day if the range is less than 7 days
          key = format(orderDate, "yyyy-MM-dd");
        } else if (totalWeeks < 5) {
          // Group by week if the range is less than 5 weeks
          key = `Week ${getWeek(orderDate)}`;
        } else {
          // Group by month if it's a larger range
          key = format(orderDate, "MMMM yyyy");
        }

        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += order.totalEarnings;

        return acc;
      }, {});

      console.log("Grouped by Date:", groupByDate); // Debug: Check grouped earnings

      // Step 5: Convert the grouped earnings into chart-friendly format
      const chartDataArray = Object.entries(groupByDate)
        .map(([period, earnings]) => ({
          timePeriod: period, // Either "Day", "Week X", or the month name
          earnings, // Total earnings for that period
        }))
        .sort((a, b) => new Date(a.timePeriod) - new Date(b.timePeriod)); // Sort by date from left to right

      console.log("Chart Data (Sorted):", chartDataArray); // Debug: Check sorted chart data

      setSellingData(sellingDataArray); // Set the selling data with total purchases
      setOrderData(filteredOrders);
      setChartData(chartDataArray); // Set the chart data with total earnings
    }
  }, [orders]);

  return (
    <div className="navbar-spacing flex flex-col justify-center items-center gap-4 sm:gap-8">
      <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
        DASHBOARD
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 ">
        {/* Left Container */}
        <OrderStatusChart orderData={orderData} />

        {/* Right Container */}
        <div className="flex flex-col gap-4 justify-between">
          <AreaChartComponent data={chartData} />
          <BestSellingChart sellingData={sellingData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
