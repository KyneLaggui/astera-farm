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

  const orders = useSelector(selectOrders);

  useEffect(() => {
    if (orders && orders.length > 0) {
      console.log("Orderss:", orders);

      const filteredOrders = orders.map((order) => {
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

      const earliestOrder = new Date(
        Math.min(...filteredOrders.map((order) => order.createdAt * 1000))
      );
      const latestOrder = new Date(
        Math.max(...filteredOrders.map((order) => order.createdAt * 1000))
      );

      const totalDays = differenceInDays(latestOrder, earliestOrder);
      const totalWeeks = differenceInWeeks(latestOrder, earliestOrder);

      console.log("Date Range:", { earliestOrder, latestOrder, totalDays });

      const groupByDate = filteredOrders.reduce((acc, order) => {
        const orderDate = new Date(order.createdAt * 1000);
        let key;

        if (totalDays < 7) {
          key = format(orderDate, "yyyy-MM-dd");
        } else if (totalWeeks < 5) {
          key = `Week ${getWeek(orderDate)}`;
        } else {
          key = format(orderDate, "MMMM yyyy");
        }

        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += order.totalEarnings;

        return acc;
      }, {});

      console.log("Grouped by Date:", groupByDate);

      const chartDataArray = Object.entries(groupByDate)
        .map(([period, earnings]) => ({
          timePeriod: period,
          earnings,
        }))
        .sort((a, b) => new Date(a.timePeriod) - new Date(b.timePeriod));

      console.log("Chart Data (Sorted):", chartDataArray);

      setSellingData(sellingDataArray);
      setOrderData(filteredOrders);
      setChartData(chartDataArray);
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
