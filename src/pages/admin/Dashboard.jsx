import { useState, useEffect } from "react";
import OrderStatusChart from "@src/pages/admin/DashboardCharts/OrderStatusChart";
import AreaChartComponent from "@src/pages/admin/DashboardCharts/AreaChartComponent";
import BestSellingChart from "@src/pages/admin/DashboardCharts/BestSellingChart";
import { Card, CardContent } from "@src/components/ui/card";
import { selectOrders } from "@src/redux/slice/ordersSlice";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [sellingData, setSellingData] = useState([]);

  const orders = useSelector(selectOrders); // Select products from Redux state

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const formatPaymentMethod = (paymentMethod) => {
    return paymentMethod
      .replace(/_/g, " ") // Replace underscores with spaces
      .split(" ") // Split into words
      .map(capitalizeFirstLetter) // Capitalize first letter of each word
      .join(" "); // Join them back with a space
  };

  useEffect(() => {
    if (orders) {
      const filteredOrders = orders.map((order) => ({
        orderId: order.id,
        status: order.status,
        products: order.cart.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.amount,
          quantity: product.quantity,
          lastUpdated: order.lastUpdated,
        })),
        createdAt: order.createdAt,
      }));

      // Calculate aggregate sales data for the best-selling chart
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

      // Convert to array format for the chart
      const sellingDataArray = Object.entries(productSales).map(([name, purchases]) => ({
        products: name,
        purchases,
      }));

      // filteredOrders.map((order) => {
      //   const timestamp = 1726032834; // Example timestamp
      //   const date = new Date(order.createdAt * 1000); // Convert seconds to milliseconds
      //   console.log(date.toISOString()); // Outputs the date in ISO 8601 format
        
      // })
      
      setOrderData(filteredOrders);
      setSellingData(sellingDataArray);
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
          <AreaChartComponent />
          <BestSellingChart sellingData={sellingData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
