import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Servicesdata } from "../../data/servicesData";

export const ServicesNav = () => {
  const [openServices, setOpenServices] = useState(true);
  const ClickOpenServices = () => setOpenServices((prev) => !prev);
  return (
    <div className="flex flex-col border-b-[2px] py-5 gap-2">
      <button
        className="flex gap-2 items-center p-2 rounded-md font-[700] text-[#191C1F]"
        onClick={ClickOpenServices}
      >
        Services {openServices ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {openServices && (
        <div>
          {Servicesdata.slice(0, 5).map((t, i) => {
            return (
              <div className="flex flex-row gap-2 text-[#475156] items-center">
                <input name="product" type="radio" />
                {t.service}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ServicesPriceRange = () => {
  const [openServices, setOpenServices] = useState(true);
  const ClickOpenServices = () => setOpenServices((prev) => !prev);
  return (
    <div className="flex flex-col border-b-[2px] py-5 gap-2">
      <button
        className="flex gap-2 items-center p-2 rounded-md font-[700] uppercase text-[#191C1F]"
        onClick={ClickOpenServices}
      >
        Price Range {openServices ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {openServices && (
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row gap-2">
            <input type="range" min="0" max="100" value="50" />
          </div>
          <div className="flex flex-row gap-2">
            <input
              className="outline-none border p-2 w-1/2 rounded-md"
              type="text"
              placeholder="Min Price"
            />
            <input
              className="outline-none border p-2 w-1/2 rounded-md"
              type="text"
              placeholder="Max Price"
            />
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input name="product" type="radio" />
            All Prices
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input name="product" type="radio" />
            Under $20
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input name="product" type="radio" />
            $25 to $100
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input name="product" type="radio" />
            $100 to $300
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input name="product" type="radio" />
            $300 to $500
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input name="product" type="radio" />
            $500 to $1,000
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input name="product" type="radio" />
            $1,000 to $10,000
          </div>
        </div>
      )}
    </div>
  );
};

export const ServicesPopularBrands = () => {
  const [openServices, setOpenServices] = useState(true);
  const ClickOpenServices = () => setOpenServices((prev) => !prev);
  return (
    <div className="flex flex-col border-b-[2px] py-5 gap-2">
      <button
        className="flex gap-2 items-center p-2 rounded-md font-[700] uppercase text-[#191C1F]"
        onClick={ClickOpenServices}
      >
        popular Brands {openServices ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {openServices && (
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Apple
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Google
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Microsoft
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Samsung
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Dell
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Hp
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Symphony
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Xiaomi
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Sony
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            Panasonic
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" checked />
            LG
          </div>
          <div className="flex flex-row gap-2 text-[#475156] items-center">
            <input type="checkbox" />
            Intel
          </div>
        </div>
      )}
    </div>
  );
};

export const ServicesPopularTags = () => {
  const [openServices, setOpenServices] = useState(true);
  const ClickOpenServices = () => setOpenServices((prev) => !prev);
  return (
    <div className="flex flex-col border-b-[2px] py-5 gap-2">
      <button
        className="flex gap-2 items-center p-2 rounded-md font-[700] uppercase text-[#191C1F]"
        onClick={ClickOpenServices}
      >
        popular Brands {openServices ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </button>
      {openServices && (
        <div className="flex flex-wrap gap-2 text-[#191C1F]">
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Game
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Iphone
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            TV
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Asus Laptops
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            MacBook
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            SSD
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Graphics Card
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Power Bank
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Smart TV
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Speaker
          </span>
          <span className="border-[2px] p-1 border-[#E4E7E9] rounded-md">
            Tablet
          </span>
        </div>
      )}
    </div>
  );
};
