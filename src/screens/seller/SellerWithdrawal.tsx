import {
  DashboardLocation,
  Footer,
  Nav,
  SellerDashboardNav,
} from "../../components/layout";
import {
  SellerWithdrawalHero,
  SellerWithdrawalHistory,
} from "../../components/sellersdashboardcomponents/sellerwithdrawals";

const SellerWithdrawal = () => {
  return (
    <div>
      <Nav />
      <DashboardLocation />
      <div className="flex flex-row p-4 gap-5">
        <SellerDashboardNav />
        <div className="overflow-x-hidden flex flex-col gap-5 w-full">
          <SellerWithdrawalHero />
          <SellerWithdrawalHistory />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerWithdrawal;
