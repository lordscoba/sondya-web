import {
  AdminBestSellers,
  AdminSalesHero,
  AdminSalesLatestOrder,
} from "../../components/admincomponents/adminsalesanalytics";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";
const AdminSalesAnalytics = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminSalesHero />
          <AdminBestSellers />
          <AdminSalesLatestOrder />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSalesAnalytics;
