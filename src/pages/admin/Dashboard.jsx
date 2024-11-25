import { useState, useEffect, useMemo } from "react";
import OrderStatusChart from "@src/pages/admin/DashboardCharts/OrderStatusChart";
import AreaChartComponent from "@src/pages/admin/DashboardCharts/AreaChartComponent";
import BestSellingChart from "@src/pages/admin/DashboardCharts/BestSellingChart";
import TopCitiesChart from "@src/pages/admin/DashboardCharts/TopCitiesChart";
import { selectOrders } from "@src/redux/slice/ordersSlice";
import { useSelector } from "react-redux";
import { selectEmail } from "@src/redux/slice/authSlice";
import { format, getWeek, getYear } from "date-fns";
import LoggedInOnly from "@src/layouts/LoggedInOnly";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { UserRound } from "lucide-react";
import PercentageTotalOrderLocation from "./DashboardCharts/PercentageTotalOrderLocation";
import TopProductPieChart from "./DashboardCharts/TopProductPieChart";
import LeastFiveProducts from "./DashboardCharts/LeastFiveProducts";
import TopCustomers from "./DashboardCharts/TopCustomers";
import ProductOrderQuantity from "./DashboardCharts/ProductOrderQuantity";
import ProductRevenue from "./DashboardCharts/ProductRevenue";

const Dashboard = () => {
  const [sellingData, setSellingData] = useState([]);
  const [leastProducts, setLeastProducts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("week");
  const [topCitiesData, setTopCitiesData] = useState([]); // State for top cities data
  const [citiesData, setCitiesData] = useState([]); // State for top cities data
  const [emailState, setEmailState] = useState(null);
  const [productOrderQuantity, setProductOrderQuantity] = useState([]);
  const [productRevenue, setProductRevenue] = useState([]);

  const orders = useSelector(selectOrders);
  const email = useSelector(selectEmail);  

  const formatNumberShort = (number) => {
    if (Math.abs(number) >= 1.0e9) {
      return (number / 1.0e9).toFixed(2) + "b";
    } else if (Math.abs(number) >= 1.0e6) {
      return (number / 1.0e6).toFixed(2) + "m";
    } else if (Math.abs(number) >= 1.0e3) {
      return (number / 1.0e3).toFixed(2) + "k";
    } else {
      return number.toFixed(2);
    }
  };

  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    return orders.map((order) => ({
      orderId: order.id,
      status: order.status,
      totalEarnings: order.total,
      createdAt: order.createdAt,
      customerName: order.shippingAddress.recipientName,
      products: order.cart,
      city: order.shippingAddress.city,
    }));
  }, [orders]);

  // Find the top 5 customers with the highest order values
  const topCustomers = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    // Step 1: Group orders by recipient name and calculate total order values
    const customerTotals = orders.reduce((acc, order) => {
      const recipientName = order?.shippingAddress?.recipientName || "Unknown";
      acc[recipientName] = (acc[recipientName] || 0) + order.total;
      return acc;
    }, {});

    // Step 2: Convert totals to an array of [name, value] pairs and sort by value in descending order
    const sortedCustomers = Object.entries(customerTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); // Sort in descending order

    // Step 3: Return the top 5 customers
    return sortedCustomers.slice(0, 5);
  }, [orders]);

  useEffect(() => {
    setEmailState(email);
  }, [email])

  useEffect(() => {
    if (filteredOrders.length === 0) return;

    const { productSales, statusCount, totalOrders, revenue } = filteredOrders.reduce(
      (acc, order) => {        
        order.products.forEach((product) => {
          acc.productSales[product.name] =
            (acc.productSales[product.name] || 0) + product.quantity; 
          acc.revenue[product.name] = (acc.revenue[product.name] || 0) + product.amount * product.quantity;          
        });
        
        acc.statusCount[order.status] =
          (acc.statusCount[order.status] || 0) + 1;
        acc.totalOrders += 1;        
        return acc;
      },
      { productSales: {}, statusCount: {}, totalOrders: 0, revenue: {} }
    );
    
    const sellingDataArray = Object.entries(productSales)
      .map(([name, purchases]) => ({ products: name, purchases }))
      .sort((a, b) => b.purchases - a.purchases)
    
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

    setTopCitiesData(topCities);

    const allCities = Object.entries(cityFrequency)
      .map(([city, frequency]) => ({ city, frequency }))
      .sort((a, b) => b.frequency - a.frequency)

    setCitiesData(allCities);

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

    const revenueArray = Object.entries(revenue).map(([key, value]) => ({
      name: key,
      revenue: value,
    }));
    
    setProductRevenue(revenueArray);
    setProductOrderQuantity(sellingDataArray);
    setSellingData(sellingDataArray.slice(0, 5));
    setLeastProducts(sellingDataArray.slice(-5));
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
      : "0.00"; // Display ₱0.00 if there are no orders

  return (
      emailState === "asterafarmsph@gmail.com" ? (
        <LoggedInOnly forAdmin={true} forUser={false}>
          <div className="navbar-spacing flex flex-col items-center justify-center gap-4 sm:gap-8 max-w-6xl mx-auto">
            <h1 className="font-gothic text-7xl sm:text-9xl text-center tracking-wide">
              PERFORMANCE OVERVIEW
            </h1>
            <div className="flex sm:flex-row gap-4 w-full justify-center flex-wrap">
              <Card className="flex-grow">
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                  <CardDescription className="text-yellow-500 text-2xl">
                    &#8369;
                    {formatNumberShort(parseFloat(totalEarnings))}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="flex-grow">
                <CardHeader>
                  <CardTitle>Total Orders</CardTitle>
                  <CardDescription className="text-yellow-500  text-2xl">
                    {filteredOrders.length}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="flex-grow">
                <CardHeader>
                  <CardTitle>Products Sold</CardTitle>
                  <CardDescription className="text-yellow-500 text-2xl">
                    {totalProductsSold}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="flex-grow">
                <CardHeader>
                  <CardTitle>Average Revenue</CardTitle>
                  <CardDescription className="text-yellow-500 text-2xl">
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
                    selectedCategory={selectedCategory}
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
          </div>
        </LoggedInOnly>
      ) : (
        <LoggedInOnly forAdmin={true} forUser={false}>
          <div className="navbar-spacing flex flex-col items-center justify-center gap-4 sm:gap-8 max-w-6xl mx-auto">
            <h1 className="font-gothic text-7xl sm:text-9xl text-center tracking-wide">
              PERFORMANCE OVERVIEW
            </h1>      
            <div className="flex flex-col md:flex-row justify-between gap-4 w-full flex-grow">              
              <div className="flex-grow flex justify-center">
                <TopCustomers topCustomers={topCustomers} />
              </div>
               <div className="flex flex-col max-w-xs gap-4 w-full justify-center flex-wrap">
                <Card className="flex-grow text-center flex justify-center items-center">
                  <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                    <CardDescription className="text-yellow-500 text-2xl">
                      &#8369;
                      {formatNumberShort(parseFloat(totalEarnings))}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="flex-grow text-center flex justify-center items-center">
                  <CardHeader>
                    <CardTitle>Total Orders</CardTitle>
                    <CardDescription className="text-yellow-500  text-2xl">
                      {filteredOrders.length}
                    </CardDescription>
                  </CardHeader>
                </Card>               
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full gap-4 flex-grow">
                <div className="flex-grow flex justify-center">
                  <PercentageTotalOrderLocation data={citiesData} />
                </div>
                <div className="flex flex-col max-w-xs gap-4 w-full justify-center flex-wrap">
                <Card className="flex-grow text-center flex justify-center items-center">
                  <CardHeader>
                    <CardTitle>Customer with the Largest Order Value</CardTitle>
                    <CardDescription className="text-yellow-500 text-2xl">                                      
                        {topCustomers.length > 0
                          ? (
                            <div className="flex justify-center items-center gap-5">
                              <UserRound size={60} />
                              <div>
                                <div>{topCustomers[0].name}</div>
                                <div>&#8369;{topCustomers[0].value.toLocaleString()}</div>
                              </div>                              
                            </div>                       
                          ) : "No data available"
                        }                                                         
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="flex-grow text-center flex justify-center items-center">
                  <CardHeader>
                    <CardTitle>Average Order Value</CardTitle>
                    <CardDescription className="text-yellow-500 text-2xl">
                      &#8369;{averageOrderRevenue}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="flex-grow text-center flex justify-center items-center">
                  <CardHeader>
                    <CardTitle>Date with Most Product Order</CardTitle>
                    <CardDescription className="text-yellow-500  text-2xl">
                      {filteredOrders.length}
                    </CardDescription>
                  </CardHeader>
                </Card>               
              </div>
              </div>
            <div className="flex flex-col gap-4 w-full justify-center flex-wrap lg:flex-nowrap">
              <div className="flex flex-col md:flex-row justify-between gap-4 w-full flex-grow">
                <div className="flex-grow flex justify-center">
                  <TopProductPieChart productsData={sellingData} />
                </div>
                {/* <div className="flex-grow flex justify-center">
                  <BestSellingChart sellingData={sellingData} top={3}/>
                </div> */}
                <div className="flex-grow flex justify-center">
                  <LeastFiveProducts productsData={leastProducts} />
                </div>
              </div>              
            </div>
            <div className="flex flex-col gap-4 w-full justify-center flex-wrap lg:flex-nowrap">
              <div className="flex flex-col md:flex-row justify-between gap-4 w-full flex-grow">
                <div className="flex-grow flex justify-center">
                  <ProductRevenue productRevenue={productRevenue}/>
                </div>              
                <div className="flex-grow flex justify-center">
                  <ProductOrderQuantity productOrderQuantity={productOrderQuantity}/>                  
                </div>                               
              </div>               
            </div>
          </div>
        </LoggedInOnly>
      )
  );
};

export default Dashboard;
