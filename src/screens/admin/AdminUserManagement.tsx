import { AdminUsersBody } from "../../components/admincomponents/adminusers";
import {
  AdminDashboardNav,
  DashboardLocation,
  Footer,
  Nav,
} from "../../components/layout";

const AdminUserManagement = () => {
  return (
    <div>
      <Nav isAdminDasboard />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <AdminDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <AdminUsersBody />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminUserManagement;
