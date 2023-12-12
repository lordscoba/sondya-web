import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  Cart,
  Checkout,
  ContactUs,
  ErrorPage,
  GiftBoxes,
  Home,
  HotOffers,
  ProductDetails,
  Products,
  Referal,
  ServiceDetails,
  Services,
  WishList,
} from "./screens";
// Auth Import
import {
  AuthError,
  AuthSuccess,
  EmailVerification,
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
} from "./screens/auth";
// dashboard Import
import Acknowledgement from "./screens/Acknowledgement";
import GroupChat from "./screens/GroupChat";
import GroupChatDetails from "./screens/GroupChatDetails";
import GroupChatList from "./screens/GroupChatList";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import ServiceCheckout from "./screens/ServiceCheckout";
import TermsAndServices from "./screens/TermsAndServices";
import {
  AdminAccountPayment,
  AdminAddCategory,
  AdminAddProduct,
  AdminAddService,
  AdminCategory,
  AdminCreateGroupChat,
  AdminDashboard,
  AdminEditCategory,
  AdminEditProduct,
  AdminEditService,
  AdminEditUser,
  AdminGroupChatList,
  AdminOrderDetails,
  AdminOrders,
  AdminProductDetails,
  AdminProducts,
  AdminSalesAnalytics,
  AdminServiceDetails,
  AdminServices,
  AdminTestimonial,
  AdminUpdateTestimonial,
  AdminUserDetails,
  AdminUserManagement,
  AdminWithdrawalOrders,
} from "./screens/admin";
import {
  BrowseHistory,
  Dashboard,
  DashboardSettings,
  Inbox,
  OrderConfirmation,
  OrderDetails,
  OrderHistory,
  Payment,
  ServiceOrderDetails,
  TrackDetails,
  TrackOrder,
} from "./screens/dashboard";
import Notifications from "./screens/dashboard/Notifications";
import UserTestimony from "./screens/dashboard/UserTestimony";
import {
  SellerBusinessAnalytics,
  SellerDashboard,
  SellerEditService,
  SellerInbox,
  SellerOrder,
  SellerOrderDetails,
  SellerPostProducts,
  SellerPostService,
  SellerProducts,
  SellerServiceDetails,
  SellerServiceOrderDetails,
  SellerServices,
  SellerSettings,
  SellerWithdrawal,
} from "./screens/seller";
import SellerEditProducts from "./screens/seller/SellerEditProducts";
import SellerProductDetails from "./screens/seller/SellerProductDetails";
import {
  adminDashboardCheck,
  authCheck,
  dashboardCheck,
  homeCheck,
  sellerDashboardCheck,
} from "./utils/checkAuth.utils";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/services",
    element: <Services />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/products",
    element: <Products />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/service/details/:id/:name",
    element: <ServiceDetails />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/product/details/:id/:name",
    element: <ProductDetails />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/wishlist",
    element: <WishList />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/groupchats",
    element: <GroupChat />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/groupchat/list",
    element: <GroupChatList />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/groupchat/details",
    element: <GroupChatDetails />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/referal",
    element: <Referal />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/giftboxes",
    element: <GiftBoxes />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/hotoffers",
    element: <HotOffers />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/acknowledgement",
    element: <Acknowledgement />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/terms",
    element: <TermsAndServices />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  {
    path: "/service/checkout",
    element: <ServiceCheckout />,
    errorElement: <ErrorPage />,
    loader: homeCheck,
  },
  // Authentication
  {
    path: "/auth/error",
    element: <AuthError />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/auth/success",
    element: <AuthSuccess />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/email-verification/:email",
    element: <EmailVerification />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/reset-password/:email",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/login",
    element: <SignIn />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },
  {
    path: "/register",
    element: <SignUp />,
    errorElement: <ErrorPage />,
    loader: authCheck,
  },

  // User DasboardRoutes
  {
    path: "/browse-history",
    element: <BrowseHistory />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/dashboard/settings",
    element: <DashboardSettings />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/inbox",
    element: <Inbox />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/order/confirmation",
    element: <OrderConfirmation />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/order/history",
    element: <OrderHistory />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/order/details",
    element: <OrderDetails />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/order/service/details",
    element: <ServiceOrderDetails />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/payment",
    element: <Payment />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/track-details",
    element: <TrackDetails />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/track-order",
    element: <TrackOrder />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/testimony",
    element: <UserTestimony />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },
  {
    path: "/user/notifications",
    element: <Notifications />,
    errorElement: <ErrorPage />,
    loader: dashboardCheck,
  },

  // Seller dashboard routes
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/analytics",
    element: <SellerBusinessAnalytics />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/inbox",
    element: <SellerInbox />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/order",
    element: <SellerOrder />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/order/details",
    element: <SellerOrderDetails />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/service/order/details",
    element: <SellerServiceOrderDetails />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/products/post",
    element: <SellerPostProducts />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/products/edit/:id",
    element: <SellerEditProducts />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/products/details/:id",
    element: <SellerProductDetails />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/products",
    element: <SellerProducts />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/settings",
    element: <SellerSettings />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/withdrawal",
    element: <SellerWithdrawal />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/services",
    element: <SellerServices />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/service/post",
    element: <SellerPostService />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/service/edit/:id",
    element: <SellerEditService />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },
  {
    path: "/seller/service/details/:id",
    element: <SellerServiceDetails />,
    errorElement: <ErrorPage />,
    loader: sellerDashboardCheck,
  },

  // Admin dashboard routes
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/analytics",
    element: <AdminSalesAnalytics />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/category",
    element: <AdminCategory />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/category/add",
    element: <AdminAddCategory />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/category/edit/:id",
    element: <AdminEditCategory />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/groupchat/list",
    element: <AdminGroupChatList />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/groupchat/create",
    element: <AdminCreateGroupChat />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/groupchat/details",
    element: <AdminCreateGroupChat />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/products",
    element: <AdminProducts />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/product/add",
    element: <AdminAddProduct />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/product/edit/:id",
    element: <AdminEditProduct />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/product/details/:id",
    element: <AdminProductDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/services",
    element: <AdminServices />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/service/add",
    element: <AdminAddService />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/service/edit/:id",
    element: <AdminEditService />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/service/details/:id",
    element: <AdminServiceDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/users",
    element: <AdminUserManagement />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/user/edit/:id",
    element: <AdminEditUser />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/user/details/:id",
    element: <AdminUserDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/orders",
    element: <AdminOrders />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/order/details",
    element: <AdminOrderDetails />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/testimonial",
    element: <AdminTestimonial />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/testimonial/edit",
    element: <AdminUpdateTestimonial />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/payments",
    element: <AdminAccountPayment />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
  {
    path: "/admin/withdrawal/orders",
    element: <AdminWithdrawalOrders />,
    errorElement: <ErrorPage />,
    loader: adminDashboardCheck,
  },
]);

export default App;
