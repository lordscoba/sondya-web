import {
  AdminDasboardRecentOrders,
  AdminDashboardHero,
} from "../../components/admincomponents/admindashboard";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminDashboard = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminDashboardHero />
          <AdminDasboardRecentOrders />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
