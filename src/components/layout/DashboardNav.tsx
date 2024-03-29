import { useEffect, useRef, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsCart, BsChat, BsGear } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import {
  MdOutlineChangeCircle,
  MdOutlineMiscellaneousServices,
  MdPayment,
  MdStorefront,
} from "react-icons/md";
import {
  PiClockClockwiseLight,
  PiSignOutFill,
  PiStackBold,
} from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_SESSION } from "../../extraStorage/storageStore";
import { logoutAction } from "../../redux/actions/auth.actions";

export const UserDashboardNav = ({
  isSmScreen = false,
  isOpen = false,
  setIsOpen,
}: {
  isSmScreen?: boolean;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [index, setIndex] = useState<string>("dashboard");

  const navigate = useNavigate();

  // for logout
  const logoutHandler = () => {
    logoutAction();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(LOGIN_SESSION);
    }
    navigate("/");
  };

  const menuButtonRef = useRef<any>();

  // handles click outside the navBar
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsOpen && setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuButtonRef, setIsOpen]);

  return (
    <div
      ref={menuButtonRef}
      className={` ${
        isSmScreen && isOpen
          ? "flex md:hidden fixed bg-white z-20 animate__animated animate__slideInLeft overflow-y-auto h-full"
          : !isSmScreen
          ? "hidden md:flex"
          : "hidden"
      } text-[#5F6C72] flex-col gap-3 border py-3 rounded-md w-[17rem] h-fit max-w-[20rem]`}
    >
      <button
        onClick={() => setIsOpen && setIsOpen(false)}
        id="menu-btn"
        className={` ${
          isOpen && "open"
        } flex hamburger focus:outline-none bg-[#E0E0E0] p-8 md:p-6 rounded-lg md:hidden mx-2`}
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "dashboard" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("dashboard");
          navigate("/dashboard");
        }}
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
        onClick={() => {
          setIndex("cart");
          navigate("/cart");
        }}
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
        onClick={() => {
          setIndex("payment");
          navigate("/user/payment");
        }}
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
        onClick={() => {
          setIndex("history");
          navigate("/user/order/history");
        }}
      >
        <span>
          <MdStorefront />
        </span>{" "}
        <span className="whitespace-nowrap">Order History</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "service-history" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("service-history");
          navigate("/user/service/order/history");
        }}
      >
        <span>
          <MdOutlineMiscellaneousServices />
        </span>{" "}
        <span className="whitespace-nowrap">Service Order History</span>
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
        <Link to={"/user/track-order"}>
          <span className="whitespace-nowrap">Track Order</span>
        </Link>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "wishlist" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("wishlist");
          navigate("/wishlist");
        }}
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
        onClick={() => {
          setIndex("inbox");
          navigate("/user/inbox");
        }}
      >
        <span>
          <BsChat />
        </span>{" "}
        <span className="whitespace-nowrap">Inbox</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "groupchat" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("groupchat");
          navigate("/groupchat/list");
        }}
      >
        <span>
          <IoChatbubblesOutline />
        </span>{" "}
        <span className="whitespace-nowrap">Groups</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "testimony" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("testimony");
          navigate("/user/testimony");
        }}
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
        onClick={() => {
          setIndex("setting");
          navigate("/dashboard/settings");
        }}
      >
        <span>
          <BsGear />
        </span>{" "}
        <span className="whitespace-nowrap">Setting</span>
      </div>
      <div
        className={`flex flex-row gap-2 items-center py-2 px-6 ${
          index === "seller-dashboard" && "bg-[#EDB842] text-white"
        }`}
        onClick={() => {
          setIndex("seller-dashboard");
          navigate("/seller/dashboard");
        }}
      >
        <span>
          <MdOutlineChangeCircle />
        </span>{" "}
        <span className="whitespace-nowrap">Go to seller page</span>
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
