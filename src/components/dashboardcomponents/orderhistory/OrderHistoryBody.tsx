import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userGetProductsOrdersAction } from "../../../redux/actions/userDashboard/productsOrder.actions";
import { ReducersType } from "../../../redux/store";
import { GetProductOrder } from "../../../redux/types/checkout.types";
import { ReduxResponseType } from "../../../redux/types/general.types";
import { FormatNumber } from "../../shareables/FormatNumber";

const OrderHistoryBody = () => {
  // fetch data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductOrdersRedux = useSelector(
    (state: ReducersType) => state?.userGetProductOrders
  ) as ReduxResponseType<GetProductOrder[]>;

  const productOrderData = useMemo(() => {
    return getProductOrdersRedux?.serverResponse?.data;
  }, [getProductOrdersRedux]);
  // console.log(getProductOrdersRedux);

  useEffect(() => {
    dispatch(userGetProductsOrdersAction("") as any);
  }, [dispatch]);

  // console.log(productOrderData);
  return (
    <section className="border w-full flex flex-col gap-1">
      <div className="flex flex-row justify-between font-[600] py-3 px-6">
        <span>Recent Order</span>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="bg-[#E4E7E9]">
            <tr className="">
              <th className="py-4 px-6 font-[400] text-[#475156]">Order ID</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Status</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Date</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Total</th>
              <th className="py-4 px-6 font-[400] text-[#475156]">Action</th>
            </tr>
          </thead>
          <tbody>
            {productOrderData && productOrderData.length > 0 ? (
              productOrderData.map((t, i) => {
                const dateString = t.createdAt ? t.createdAt : "";
                const dateObject = new Date(dateString);
                const formattedDate = format(dateObject, "MMMM d, yyyy");
                console.log(t);

                return (
                  <tr key={i}>
                    <td className="py-4 px-6 text-[#000000] font-[700] whitespace-nowrap">
                      {t.order_id}
                    </td>
                    <td
                      className={`text-[#2DB224] py-4 px-6 font-[600] whitespace-nowrap`}
                    >
                      {t.order_status}
                    </td>
                    <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                      {formattedDate}
                    </td>
                    <td className="py-4 px-6 text-[#5F6C72] font-[400] whitespace-nowrap">
                      $
                      {t.checkout_items.total_price && (
                        <FormatNumber price={t.checkout_items.total_price} />
                      )}
                    </td>
                    <td className="py-4 px-6 font-[600]">
                      <button
                        onClick={() => navigate(`/user/order/details/${t._id}`)}
                        className="text-[#EDB842] flex flex-row gap-2 items-center whitespace-nowrap"
                      >
                        <span>View Details</span>
                        <AiOutlineArrowRight />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className="w-full">NO orders at this time</div>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderHistoryBody;
