import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { BiExport, BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsFillEyeFill, BsSearch, BsThreeDots } from "react-icons/bs";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { adminGetProductsOrdersAction } from "../../../redux/actions/admin/productsOrder.actions";
import { ReducersType } from "../../../redux/store";
import {
  AdminGetProductOrder,
  GetProductOrder,
} from "../../../redux/types/checkout.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { FormatNumber } from "../../shareables/FormatNumber";
import { ADMIN_GET_PRODUCTS_ORDERS_RESET } from "../../../redux/constants/admin/ProductOrder.constants";

export type QueryType = {
  limit: number;
  page: number;
  search: string;
  status: string;
  date: string;
};

const AdminOrdersBody = () => {
  const [whichTab, setwhichTab] = useState<string>("#1");

  // fetch data
  const limit = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [productOrderData, setProductOrderData] = useState<GetProductOrder[]>();
  const [total, setTotal] = useState<number>(0);

  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
    limit: limit,
    status: "",
    date: "",
  });

  // update query and url
  const updateQueryString = useCallback(
    (newParams: QueryType) => {
      const searchParams = new URLSearchParams(location.search);
      // Update or add new parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.set(key, String(value));
        } else {
          searchParams.delete(key);
        }
      });

      // Build the new search string
      const newSearch = searchParams.toString();

      // set query string
      setQueryString(newSearch);

      // Use navigate to change the URL
      navigate({
        pathname: location.pathname,
        search: newSearch,
      });
    },
    [location.pathname, location.search, navigate]
  );

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1500);
  }, [query, updateQueryString]);

  const prevPage = () => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: prev.page--,
      };
    });
  };

  const nextPage = () => {
    setQuery((prev: QueryType) => {
      alert(prev.page++);
      return {
        ...prev,
        page: prev.page++,
      };
    });
  };

  const goToPage = (page: number) => {
    setQuery((prev: QueryType) => {
      return {
        ...prev,
        page: page,
      };
    });
  };

  const getProductOrdersRedux = useSelector(
    (state: ReducersType) => state?.adminGetProductsOrders
  ) as ReduxResponseType<AdminGetProductOrder>;

  useEffect(() => {
    if (getProductOrdersRedux?.success) {
      setTotalPages(
        Math.ceil(
          Number(getProductOrdersRedux?.serverResponse?.data?.count) / limit
        )
      );
      setTotal(getProductOrdersRedux?.serverResponse?.data?.count);
      setProductOrderData(getProductOrdersRedux?.serverResponse?.data?.orders);
      dispatch({ type: ADMIN_GET_PRODUCTS_ORDERS_RESET });
    }
  }, [
    dispatch,
    getProductOrdersRedux?.success,
    getProductOrdersRedux?.serverResponse?.data,
  ]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(adminGetProductsOrdersAction(queryString) as any);
    }, 500);
  }, [dispatch, queryString]);

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3 justify-between">
          <div className="font-[600] text-xl w-auto">Order</div>
          <div className="flex flex-row gap-2">
            <button className="flex flex-row items-center p-2 rounded-md border border-[#EDB842] gap-2">
              <span className="text-[#EDB842]">
                <BiExport />
              </span>
              <span className="whitespace-nowrap text-[#EDB842]">Export</span>
            </button>
            <button className="flex flex-row items-center p-2 rounded-md bg-[#EDB842] text-white gap-2">
              <span className="text-2xl">
                <MdOutlineAdd />
              </span>
              <span className="whitespace-nowrap">Add Order</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-row border rounded-md p-1 text-[#667085] gap-2 w-fit overflow-x-auto">
            <button
              onClick={() => {
                setwhichTab("#1");
                setQuery({ ...query, page: 1, status: "" });
              }}
              className={` ${
                whichTab === "#1" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md whitespace-nowrap`}
            >
              All Status
            </button>
            <button
              onClick={() => {
                setwhichTab("#2");
                setQuery({ ...query, page: 1, status: "Processing" });
              }}
              className={` ${
                whichTab === "#2" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md`}
            >
              Processing
            </button>
            <button
              onClick={() => {
                setwhichTab("#3");
                setQuery({ ...query, page: 1, status: "Shipping" });
              }}
              className={` ${
                whichTab === "#3" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md`}
            >
              Shipping
            </button>
            <button
              onClick={() => {
                setwhichTab("#4");
                setQuery({ ...query, page: 1, status: "Delivered" });
              }}
              className={` ${
                whichTab === "#4" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md`}
            >
              Delivered
            </button>
            <button
              onClick={() => {
                setwhichTab("#5");
                setQuery({ ...query, page: 1, status: "Cancelled" });
              }}
              className={` ${
                whichTab === "#5" && "text-[#883DCF] bg-[#F4ECFB]"
              } p-2 rounded-md`}
            >
              Cancelled
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
              <BsSearch />
              <input
                className="p-1"
                type="text"
                placeholder="Search orders. . ."
                value={query.search}
                onChange={(event) =>
                  setQuery({ ...query, search: event?.target?.value, page: 1 })
                }
              />
            </div>
            <div className="flex flex-row items-center border h-fit p-2 rounded-md gap-2">
              {/* <BsCalendar2 /> */}
              <input
                className="p-1"
                type={"date"}
                placeholder="Search Date"
                onChange={(event) =>
                  setQuery({ ...query, page: 1, date: event.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-[#1D1F2C] text-start">Product</th>
                <th className="text-[#1D1F2C] text-start">Total products</th>
                <th className="text-[#1D1F2C] text-start">Total Price</th>
                <th className="text-[#1D1F2C] text-start">Order Status</th>
                <th className="text-[#1D1F2C] text-start">Added</th>
                <th className="text-[#1D1F2C] text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {productOrderData && productOrderData.length > 0
                ? productOrderData.map((t, i) => {
                    const dateString = t.createdAt ? t.createdAt : "";
                    const dateObject = new Date(dateString);
                    const formattedDate = format(dateObject, "MMMM d, yyyy");
                    return (
                      <tr key={i}>
                        <td>
                          <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex flex-col gap-2 text-sm">
                              {t?.checkout_items?.name}
                            </div>
                          </div>
                        </td>
                        <td className="text-[#A3A9B6]">
                          {t?.checkout_items?.order_quantity}
                        </td>
                        <td className="text-[#A3A9B6]">
                          {}
                          $
                          <FormatNumber
                            price={t?.checkout_items?.total_price}
                          />
                        </td>
                        <td>
                          {t.order_status === "Low Stock" ? (
                            <div className="p-1 text-[#F86624] bg-[#FFF0EA] w-fit h-fit rounded-lg">
                              {t.order_status}
                            </div>
                          ) : t.order_status === "Published" ? (
                            <div className="p-1 text-[#1A9882] bg-[#E9FAF7] w-fit h-fit rounded-lg">
                              {t.order_status}
                            </div>
                          ) : t.order_status === "Draft" ? (
                            <div className="p-1 text-[#667085] bg-[#F0F1F3] w-fit h-fit rounded-lg">
                              {t.order_status}
                            </div>
                          ) : (
                            <div className="p-1 text-[#EB3D4D] bg-[#FEECEE] w-fit h-fit rounded-lg">
                              {t.order_status}
                            </div>
                          )}
                        </td>
                        <td className="text-[#A3A9B6]">{formattedDate}</td>
                        <td>
                          <div className="flex flex-row gap-2 items-center text-[#A3A9B6]">
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/admin/order/details/${t._id}`)
                              }
                            >
                              <BsFillEyeFill />
                            </button>
                            <button>
                              <MdDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-[#667085]">
            Showing {query.page * 10 - 9}-
            {query.page * 10 > total ? total : query.page * 10} from {total}
          </div>
          <div className="flex flex-row gap-2 items-center text-[#EDB842] self-center my-5">
            <button
              disabled={query.page <= 1}
              type="button"
              onClick={() => prevPage()}
              className="bg-[#EDB84233] p-2 rounded-md"
            >
              <BiSolidLeftArrow />
            </button>
            {Number.isInteger(totalPages) &&
              totalPages >= 0 &&
              Array.from({
                length: totalPages,
              }).map((_, i) => {
                if (i >= dotIndex && i <= dotIndex + 2) {
                  return (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`${
                        query.page === i + 1 && "bg-[#EDB84233]"
                      } px-4 py-2 rounded-md`}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return <div className="hidden">...</div>;
              })}
            {Number.isInteger(totalPages) && totalPages > 3 && (
              <button
                onClick={() => {
                  totalPages >= dotIndex
                    ? setDotIndex((prev: number) => prev + 3)
                    : setDotIndex(0);
                }}
                className="p-2 bg-[#EDB842] rounded-md text-white"
              >
                <BsThreeDots />
              </button>
            )}
            <button
              type="button"
              disabled={query.page >= totalPages}
              onClick={() => nextPage()}
              className="bg-[#EDB84233] p-2 rounded-md"
            >
              <BiSolidRightArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrdersBody;
