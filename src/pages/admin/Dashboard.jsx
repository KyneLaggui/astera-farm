import OrderStatusChart from "@src/pages/admin/DashboardCharts/OrderStatusChart";
import AreaChartComponent from "@src/pages/admin/DashboardCharts/AreaChartComponent";
import BestSellingChart from "@src/pages/admin/DashboardCharts/BestSellingChart";
import { Card, CardContent } from "@src/components/ui/card";

const Dashboard = () => {
  return (
    <div className="navbar-spacing flex flex-col justify-center items-center gap-4 sm:gap-8">
      <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
        DASHBOARD
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 ">
        {/* Left Container */}
        <OrderStatusChart />

        {/* Right Container */}
        <div className="flex flex-col gap-4 justify-between">
          <AreaChartComponent />
          <BestSellingChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
