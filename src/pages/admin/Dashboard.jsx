import { useState, useEffect } from "react";
import OrderStatusChart from "@src/pages/admin/DashboardCharts/OrderStatusChart";
import AreaChartComponent from "@src/pages/admin/DashboardCharts/AreaChartComponent";
import BestSellingChart from "@src/pages/admin/DashboardCharts/BestSellingChart";
import { selectOrders } from "@src/redux/slice/ordersSlice";
import { useSelector } from "react-redux";
import { format, getWeek, differenceInDays, differenceInWeeks } from "date-fns";
import LoggedInOnly from "@src/layouts/LoggedInOnly";

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [sellingData, setSellingData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const orders = useSelector(selectOrders);

  useEffect(() => {
    if (orders && orders.length > 0) {
      console.log("Orders:", orders);

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

      let sellingDataArray = Object.entries(productSales).map(
        ([name, purchases]) => ({
          products: name,
          purchases,
        })
      );

      // Sort and get top 3 selling products
      sellingDataArray = sellingDataArray
        .sort((a, b) => b.purchases - a.purchases) // Sort by purchases in descending order
        .slice(0, 3); // Get top 3 products

      // Calculate status counts for the donut chart
      const statusCount = filteredOrders.reduce((acc, order) => {
        if (acc[order.status]) {
          acc[order.status] += 1;
        } else {
          acc[order.status] = 1;
        }
        return acc;
      }, {});

      const statusDataArray = Object.entries(statusCount).map(
        ([status, count]) => ({
          status,
          count,
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
      
      console.log("Selling Data:", sellingDataArray);
      setSellingData(sellingDataArray);
      setOrderData(filteredOrders);
      setChartData(chartDataArray);
      setStatusData(statusDataArray); // Update statusData state
    }
  }, [orders]);

  return (
    <LoggedInOnly forAdmin={true} forUser={false}>
      <div className="navbar-spacing flex flex-col justify-center items-center gap-4 sm:gap-8">
        <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
          DASHBOARD
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 ">
          {/* Left Container */}
          <BestSellingChart sellingData={sellingData} /> {/* Pass statusData to OrderStatusChart */}

          {/* Right Container */}
          <div className="flex flex-col gap-4 justify-between">
            <AreaChartComponent data={chartData} />
            <OrderStatusChart statusData={statusData} /> {/* Pass sellingData to BestSellingChart */}
          </div>
        </div>
      </div>
    </LoggedInOnly>
  );
};

export default Dashboard;
