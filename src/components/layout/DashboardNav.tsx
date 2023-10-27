import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsCart, BsChat, BsGear } from "react-icons/bs";
import { MdPayment, MdStorefront } from "react-icons/md";
import {
  PiClockClockwiseLight,
  PiSignOutFill,
  PiStackBold,
} from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_SESSION } from "../../extraStorage/storageStore";
import { logoutAction } from "../../redux/actions/auth.actions";
import { ReducersType } from "../../redux/store";
import { LoginResponseType } from "../../redux/types/auth.types";
import { ReduxResponseType } from "../../redux/types/general.types";

export const UserDashboardNav = () => {
  const [index, setIndex] = useState<string>("dashboard");

  // for logout
  const navigate = useNavigate();
  const [loginRedux, setLoginRedux] =
    useState<ReduxResponseType<LoginResponseType>>();

  const _loginRedux = useSelector(
    (state: ReducersType) => state?.login
  ) as ReduxResponseType<LoginResponseType>;

  const logoutHandler = () => {
    logoutAction();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(LOGIN_SESSION);
    }
    navigate("/");
  };

  useEffect(() => {
    if (_loginRedux?.serverResponse?.success) {
      setLoginRedux(_loginRedux);
    }
  }, [_loginRedux]);

  return (
    <div className="text-[#5F6C72] hidden md:flex flex-col gap-3 border py-3 rounded-md w-[17rem] h-fit max-w-[17rem]">
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "dashboard" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("dashboard")}
      >
        <span>
          <PiStackBold />
        </span>
        <span className="whitespace-nowrap">Dashboard</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "cart" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("cart")}
      >
        <span>
          <BsCart />
        </span>
        <span className="whitespace-nowrap">Shopping Cart</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "payment" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("payment")}
      >
        <span>
          <MdPayment />
        </span>{" "}
        <span className="whitespace-nowrap">Payment Method</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "history" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("history")}
      >
        <span>
          <MdStorefront />
        </span>{" "}
        <span className="whitespace-nowrap">Order History</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "track" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("track")}
      >
        <span>
          <BiMap />
        </span>
        <Link to={"/track-0rder"}>
          <span className="whitespace-nowrap">Track Order</span>
        </Link>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "wishlist" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("wishlist")}
      >
        <span>
          <AiOutlineHeart />
        </span>{" "}
        <span className="whitespace-nowrap">Wishlist</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "inbox" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("inbox")}
      >
        <span>
          <BsChat />
        </span>{" "}
        <span className="whitespace-nowrap">Inbox</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "browse" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("browse")}
      >
        <span>
          <PiClockClockwiseLight />
        </span>{" "}
        <span className="whitespace-nowrap">Browsing History</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "testimony" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("testimony")}
      >
        <span>
          <PiClockClockwiseLight />
        </span>{" "}
        <span className="whitespace-nowrap">Testimonial</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "setting" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => setIndex("setting")}
      >
        <span>
          <BsGear />
        </span>{" "}
        <span className="whitespace-nowrap">Setting</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "log-out" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          logoutHandler();
          setIndex("log-out");
        }}
      >
        <span>
          <PiSignOutFill />
        </span>{" "}
        <span className="whitespace-nowrap">Log-out</span>
      </div>
    </div>
  );
};
