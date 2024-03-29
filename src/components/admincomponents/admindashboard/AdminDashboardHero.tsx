import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { productImage1 } from "../../../images/products";
import {
  adminAnalyticsRevenuAndOrderAction,
  adminAnalyticsVisitorsAndConversionsAction,
  adminAnalytictsLatestProductOrdersAction,
  adminAnalytictsLatestServiceOrdersAction,
  adminAnalytictsTopProductsAction,
  adminAnalytictsTopServicesAction,
} from "../../../redux/actions/admin/analytics.actions";
import {
  ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_RESET,
  ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_RESET,
  ADMIN_ANALYTICS_REVENUE_AND_ORDER_RESET,
  ADMIN_ANALYTICS_TOPPRODUCTS_RESET,
  ADMIN_ANALYTICS_TOPSERVICES_RESET,
  ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_RESET,
} from "../../../redux/constants/admin/analytics.constatnts";
import { ReducersType } from "../../../redux/store";
import {
  ConversionsAnalyticsType,
  OrdersAnalyticsType,
  RevenueAnalyticsType,
  TopProductsType,
  TopServiceType,
  VisitorsAnalyticsType,
} from "../../../redux/types/admin_analytics.types";
import { GetProductOrder } from "../../../redux/types/checkout.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { ServiceOrderType } from "../../../redux/types/serviceOrders.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import AdminSalesLatestOrder from "./AdminSalesLatestOrder";

const AdminDashboardHero = () => {
  const dispatch = useDispatch();

  // Fetch data from backend
  useEffect(() => {
    dispatch(adminAnalytictsTopProductsAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAnalytictsTopServicesAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAnalytictsLatestProductOrdersAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAnalytictsLatestServiceOrdersAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAnalyticsRevenuAndOrderAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminAnalyticsVisitorsAndConversionsAction() as any);
  }, [dispatch]);

  //  the redux state
  const revenueAndOrderAnalyticsRedux = useSelector(
    (state: ReducersType) => state.adminAnalyticsRevenueAndOrder
  ) as ReduxResponseType<{
    revenueAnalytics: RevenueAnalyticsType;
    ordersAnalytics: OrdersAnalyticsType;
  }>;
  const visitorsAndConversionsRedux = useSelector(
    (state: ReducersType) => state.adminAnalyticsVisitorsAndConversions
  ) as ReduxResponseType<{
    visitors: VisitorsAnalyticsType;
    conversions: ConversionsAnalyticsType;
  }>;

  const latestProductOrdersRedux = useSelector(
    (state: ReducersType) => state.adminAnalytictsLatestProductOrders
  ) as ReduxResponseType<GetProductOrder[]>;
  const latestServiceOrdersRedux = useSelector(
    (state: ReducersType) => state.adminAnalytictsLatestServiceOrders
  ) as ReduxResponseType<ServiceOrderType[]>;

  const topProductsRedux = useSelector(
    (state: ReducersType) => state.adminAnalytictsTopProducts
  ) as ReduxResponseType<TopProductsType[]>;
  const topservicesRedux = useSelector(
    (state: ReducersType) => state.adminAnalytictsTopServices
  ) as ReduxResponseType<TopServiceType[]>;

  // Set the state and reset the redux state
  const [revenueAnalytics, setRevenueAnalytics] =
    useState<RevenueAnalyticsType>();
  const [latestProductOrders, setLatestProductOrders] = useState<
    GetProductOrder[]
  >([]);
  const [latestServiceOrders, setLatestServiceOrders] = useState<
    ServiceOrderType[]
  >([]);

  const [visitors, setVisitors] = useState<VisitorsAnalyticsType>();
  const [conversions, setConversions] = useState<ConversionsAnalyticsType>();
  const [orderAnalytics, setOrderAnalytics] = useState<OrdersAnalyticsType>();
  const [topProducts, setTopProducts] = useState<TopProductsType[]>([]);
  const [topservices, setTopservices] = useState<TopServiceType[]>([]);

  useEffect(() => {
    if (topProductsRedux.success) {
      setTopProducts(topProductsRedux?.serverResponse?.data);
      dispatch({ type: ADMIN_ANALYTICS_TOPPRODUCTS_RESET });
    }

    // if (topProductsRedux.error)
    //   Swal.fire({
    //     title: "Error!!",
    //     text: "Could not load top products data",
    //     icon: "error",
    //     timer: 4000,
    //     confirmButtonText: "Okay",
    //   });
  }, [
    dispatch,
    topProductsRedux.error,
    topProductsRedux?.serverResponse?.data,
    topProductsRedux.success,
  ]);

  useEffect(() => {
    if (topservicesRedux.success) {
      setTopservices(topservicesRedux?.serverResponse?.data);
      dispatch({ type: ADMIN_ANALYTICS_TOPSERVICES_RESET });
    }

    if (topservicesRedux.error)
      Swal.fire({
        title: "Error!!",
        text: "Could not load top services data",
        icon: "error",
        timer: 4000,
        confirmButtonText: "Okay",
      }).finally(() => {
        dispatch({ type: ADMIN_ANALYTICS_TOPSERVICES_RESET });
      });
  }, [
    dispatch,
    topservicesRedux.error,
    topservicesRedux?.serverResponse?.data,
    topservicesRedux.success,
  ]);

  useEffect(() => {
    if (latestProductOrdersRedux.success) {
      setLatestProductOrders(latestProductOrdersRedux?.serverResponse?.data);
      dispatch({ type: ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_RESET });
    }

    if (latestProductOrdersRedux.error)
      Swal.fire({
        title: "Error!!",
        text: "Could not load latest product orders data",
        icon: "error",
        timer: 4000,
        confirmButtonText: "Okay",
      }).finally(() => {
        dispatch({ type: ADMIN_ANALYTICS_LATEST_PRODUCT_ORDERS_RESET });
      });
  }, [
    dispatch,
    latestProductOrdersRedux.error,
    latestProductOrdersRedux?.serverResponse?.data,
    latestProductOrdersRedux.success,
  ]);

  useEffect(() => {
    if (latestServiceOrdersRedux.success) {
      setLatestServiceOrders(latestServiceOrdersRedux?.serverResponse?.data);
      dispatch({ type: ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_RESET });
    }

    if (latestServiceOrdersRedux.error)
      Swal.fire({
        title: "Error!!",
        text: "Could not load latest service order data",
        icon: "error",
        timer: 4000,
        confirmButtonText: "Okay",
      }).finally(() => {
        dispatch({ type: ADMIN_ANALYTICS_LATEST_SERVICE_ORDERS_RESET });
      });
  }, [
    dispatch,
    latestServiceOrdersRedux.error,
    latestServiceOrdersRedux?.serverResponse?.data,
    latestServiceOrdersRedux.success,
  ]);

  useEffect(() => {
    if (revenueAndOrderAnalyticsRedux.success) {
      setRevenueAnalytics(
        revenueAndOrderAnalyticsRedux?.serverResponse?.data?.revenueAnalytics
      );
      setOrderAnalytics(
        revenueAndOrderAnalyticsRedux?.serverResponse?.data?.ordersAnalytics
      );
      dispatch({ type: ADMIN_ANALYTICS_REVENUE_AND_ORDER_RESET });
    }

    if (revenueAndOrderAnalyticsRedux.error)
      Swal.fire({
        title: "Error!!",
        text: "Could not load revenue and order analysis",
        icon: "error",
        timer: 4000,
        confirmButtonText: "Okay",
      }).finally(() => {
        dispatch({ type: ADMIN_ANALYTICS_REVENUE_AND_ORDER_RESET });
      });
  }, [
    dispatch,
    revenueAndOrderAnalyticsRedux.error,
    revenueAndOrderAnalyticsRedux?.serverResponse?.data,
    revenueAndOrderAnalyticsRedux.success,
  ]);

  useEffect(() => {
    if (visitorsAndConversionsRedux.success) {
      setVisitors(visitorsAndConversionsRedux?.serverResponse?.data?.visitors);
      setConversions(
        visitorsAndConversionsRedux?.serverResponse?.data?.conversions
      );
      dispatch({ type: ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_RESET });
    }

    // if (visitorsAndConversionsRedux.error)
    //   Swal.fire({
    //     title: "Error!!",
    //     text: "Could not load visitors and conversion analysis",
    //     icon: "error",
    //     timer: 4000,
    //     confirmButtonText: "Okay",
    //   }).finally(() => {
    //     dispatch({ type: ADMIN_ANALYTICS_VISITORS_AND_CONVERSIONS_RESET });
    //   });
  }, [
    dispatch,
    visitorsAndConversionsRedux.error,
    visitorsAndConversionsRedux?.serverResponse?.data,
    visitorsAndConversionsRedux.success,
  ]);

  return (
    <section>
      {revenueAndOrderAnalyticsRedux.loading ||
      visitorsAndConversionsRedux.loading ||
      latestProductOrdersRedux.loading ||
      latestServiceOrdersRedux.loading ||
      topProductsRedux.loading ||
      topservicesRedux.loading ? (
        <div className="flex w-full justify-center">
          <ClipLoader color="#FF8901" className="mx-auto my-8" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2 w-full">
              <div className="flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg w-[20rem]">
                <div className="flex flex-col gap-2">
                  <div className="font-[400]">Revenue</div>
                  <div className="font-[600] text-3xl">
                    ${revenueAnalytics?.totalRevenue}
                  </div>
                </div>
                <div className="w-2/3">
                  <SellerLineChart
                    colors={"#FF8901"}
                    dataArray={revenueAnalytics?.graphData}
                    label={"Month's Sales"}
                    dates={revenueAnalytics?.graphDates}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-3 items-center overflow-hidden shadow-md p-3 rounded-lg w-[20rem]">
                <div className="flex flex-col gap-2">
                  <div className="font-[400]">Orders</div>
                  <div className="font-[600] text-3xl">
                    {orderAnalytics?.totalOrders}
                  </div>
                </div>
                <div className="w-2/3">
                  <SellerLineChart
                    colors={"#FF392B"}
                    dataArray={orderAnalytics?.graphData}
                    label={"Month's Orders"}
                    dates={orderAnalytics?.graphDates}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3 rounded-md p-3">
              <div className="text-[#1C2A53] text-xl font-[500]">Traffic</div>
              <div className="flex flex-row gap-3">
                {visitors && (
                  <div className="flex flex-col gap-2 shadow-lg rounded-lg p-6 w-1/2">
                    <div className="flex flex-row gap-2 w-full justify-between">
                      <div className="font-[500] text-[#8E95A9]">
                        Store Visists
                      </div>
                      <div
                        className={
                          (visitors?.last_diff > 0
                            ? "text-[#279F51] "
                            : " text-red-500 ") + "font-[700] "
                        }
                      >
                        {visitors?.last_diff > 0 ? "+" : "-"}{" "}
                        {Math.abs(visitors?.last_diff)}
                      </div>
                    </div>
                    <div className="flex text-2xl font-[600] gap-3 items-center text-[#1C2A53]">
                      <span>{visitors.total}</span>
                      <div className="w-[10rem]">
                        <SellerLineChart
                          colors={"#279f51"}
                          dataArray={visitors?.graphData}
                          label={"Visitors"}
                          dates={visitors?.graphDates}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {conversions && (
                  <div className="flex flex-col gap-2 shadow-lg rounded-lg p-6 w-1/2">
                    <div className="flex flex-row gap-2 w-full justify-between">
                      <div className="font-[500] text-[#8E95A9]">
                        Conversions
                      </div>
                      <div
                        className={
                          (conversions?.last_diff > 0
                            ? "text-[#279F51] "
                            : " text-red-500 ") + "font-[700] "
                        }
                      >
                        {conversions?.last_diff > 0 ? "+" : "-"}{" "}
                        {Math.abs(conversions?.last_diff * 100).toFixed(2)}%
                      </div>
                    </div>
                    <div className="flex text-2xl font-[600] gap-3 items-center text-[#1C2A53]">
                      <span>
                        {Math.abs(conversions?.average * 100).toFixed(2)}%
                      </span>
                      <div className="w-[10rem]">
                        <SellerLineChart
                          colors={"#ffa000"}
                          dataArray={conversions?.graphData}
                          label={"Conversion"}
                          dates={conversions?.graphDates}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className=""></div>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <div className="w-full md:w-1/2 flex flex-col gap-2 shadow-md rounded-md p-3">
                <div className="font-[600] text-lg text-[#1D1F2C]">
                  Top Product
                </div>
                <div className="text-sm text-[#777980] font-[400]">
                  Top Product in This Month
                </div>
                {topProducts?.length &&
                  topProducts.map((t) => {
                    return (
                      <div
                        key={t.product._id}
                        className="text-sm flex flex-row justify-between gap-2 items-center"
                      >
                        <div className="flex flex-row gap-3">
                          <div className="bg-[#E0E2E7] w-8 h-8 border border-[#E0E2E7] rounded-md">
                            <img
                              className="object-contain w-full h-full"
                              src={t.product.image?.[0]?.url || productImage1}
                              alt=""
                            />
                          </div>
                          <div className="">
                            <div className="">
                              {t.product.name?.slice(0, 20)}...
                            </div>
                            <div className="text-[#667085] text-[0.8rem]">
                              {t.product.sub_category}
                            </div>
                          </div>
                        </div>
                        <div className="font-[400] text-[#1D1F2C]">
                          $<FormatNumber price={t.product.current_price} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-2 shadow-md rounded-md p-3">
                <div className="font-[600] text-lg text-[#1D1F2C]">
                  Top Service
                </div>
                <div className="text-sm text-[#777980] font-[400]">
                  Top Service in This Month
                </div>
                {topservices?.length &&
                  topservices.map((t, i) => {
                    return (
                      <div className="text-sm flex flex-row justify-between gap-2 items-center">
                        <div className="flex flex-row gap-3">
                          <div className="bg-[#E0E2E7] w-8 h-8 border border-[#E0E2E7] rounded-md">
                            <img
                              className="object-contain w-full h-full"
                              src={t.service.image?.[0]?.url}
                              alt=""
                            />
                          </div>
                          <div className="">
                            <div className="">
                              <div className="">
                                {t.service.name?.slice(0, 20)}...
                              </div>
                              <div className="text-[#667085] text-[0.8rem]">
                                {t.service.sub_category}
                              </div>
                            </div>
                            <div className="text-[#667085] text-[0.8rem]">
                              {t.service.user}
                            </div>
                          </div>
                        </div>
                        <div className="font-[400] text-[#1D1F2C]">
                          $<FormatNumber price={t.service.current_price} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <AdminSalesLatestOrder
            latestProductOrders={latestProductOrders || []}
            latestServiceOrders={latestServiceOrders || []}
          />
        </>
      )}
    </section>
  );
};

export const SellerLineChartTraffic = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const data = {
    labels: ["8", "10", "15", "20", "25"],
    datasets: [
      {
        label: "Revenue",
        data: [65, 59, 70, 61, 56, 51, 69, 71, 69, 52, 56, 71, 67, 53],
        fill: false,
        borderColor: "#EDB842", // Line color
        tension: 0.5, // Adjust this value to control the curve (0 = straight, 1 = highly curved)
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide X-axis grid lines
        },
        // display: true, // Hide X-axis scale
      },
      y: {
        grid: {
          display: true, // Hide Y-axis grid lines
        },
        // display: false, // Hide Y-axis scale
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Jan 16 - Jan 30 store visits chart",
      },
    },
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export const SellerLineChart = ({ colors, dataArray, label, dates }: any) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const data = {
    labels: dates,
    datasets: [
      {
        label: label,
        data: dataArray,
        fill: false,
        borderColor: colors, // Line color
        tension: 0.4, // Adjust this value to control the curve (0 = straight, 1 = highly curved)
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hide X-axis scale
      },
      y: {
        display: false, // Hide Y-axis scale
      },
    },
    responsive: true,
    plugins: {
      legend: {
        // position: "top" as const,
        display: false, // Hide legend labels
      },
      title: {
        // display: true,
        // text: "Chart.js Line Chart",
        display: false,
      },
    },
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default AdminDashboardHero;
