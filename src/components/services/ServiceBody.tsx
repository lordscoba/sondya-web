import { AiFillStar } from "react-icons/ai";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FormatNumber } from "../shareables/FormatNumber";
import {
  ServicesNav,
  ServicesPopularBrands,
  ServicesPopularTags,
  ServicesPriceRange,
} from "./FilterServiceNav";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import { userGetServicesAction } from "../../redux/actions/userDashboard/services.actions";
import {
  UserGetServiceType,
  userGetServicesType,
} from "../../redux/types/services.types";
import { serviceImage11 } from "../../images/serviceimages";
import { BsThreeDots } from "react-icons/bs";

export type QueryType = {
  page: number;
  search: string;
  subcategory: string;
  priceRange: string;
  popularBrands: string[];
};

const ServiceBody = () => {
  const [query, setQuery] = useState<QueryType>({
    page: 1,
    search: "",
    subcategory: "",
    priceRange: "",
    popularBrands: [],
  });

  return (
    <div className="flex flex-row px-5 py-6">
      <div className="w-3/12 px-3 py-4 md:flex hidden flex-col gap-3">
        <ServicesNav query={query} setQuery={setQuery} />
        <ServicesPriceRange query={query} setQuery={setQuery} />
        <ServicesPopularBrands query={query} setQuery={setQuery} />
        <ServicesPopularTags />
      </div>
      <ServiceBodyMain query={query} setQuery={setQuery} />
    </div>
  );
};

const ServiceBodyMain = ({
  query,
  setQuery,
}: {
  query: QueryType;
  setQuery: any;
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [queryString, setQueryString] = useState<string>("page=1");
  const [dotIndex, setDotIndex] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const limit: number = 20;

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

  const servicesRedux = useSelector(
    (state: ReducersType) => state?.userGetServices
  ) as ReduxResponseType<userGetServicesType>;

  useEffect(() => {
    if (servicesRedux.success)
      setTotalPages(
        Math.ceil(Number(servicesRedux?.serverResponse?.data?.count) / limit)
      );
  }, [servicesRedux?.success, servicesRedux?.serverResponse?.data?.count]);

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1500);
  }, [query, updateQueryString]);

  useEffect(() => {
    dispatch(userGetServicesAction(queryString) as any);
  }, [dispatch, queryString]);

  return (
    <div className="flex flex-col w-full gap-3 md:w-9/12">
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row gap-2">
          <input
            className="border-[#EDB842] outline-none border-[2px] rounded-md px-2 md:px-4"
            type="text"
            placeholder="Search for anything..."
            value={query.search}
            onChange={(event) => {
              setQuery({ ...query, search: event.target.value });
            }}
          />
        </div>
        <div className="flex flex-row gap-2 items-center text-[#5F6C72]">
          <label htmlFor="">Sort by:</label>
          <select
            className="border-[2px] border-[#E4E7E9] p-2 rounded-md"
            name=""
            id=""
          >
            <option value="">Most Popular</option>
            <option value="">Most Popular</option>
            <option value="">Most Popular</option>
          </select>
        </div>
      </div>
      <div className="bg-[#EDB84233] flex flex-row gap-2 justify-between p-2 rounded-md text-[#5F6C72] font-[600]">
        <div className="flex flex-row gap-2 items-center">
          <span className="font-[400] whitespace-nowrap">Active Filters:</span>
          {/* Active subategory filter */}
          {query.subcategory && (
            <span className="hidden md:flex items-center gap-2">
              {query.subcategory}
              <button
                onClick={() =>
                  setQuery({
                    ...query,
                    subcategory: "",
                  })
                }
              >
                <FaTimes />
              </button>
            </span>
          )}

          {/* Active price range */}
          {query.priceRange && (
            <span className="hidden md:flex items-center gap-2">
              $
              {Number(query.priceRange.split("_")[0])
                ? query.priceRange.split("_")[0]
                : 0}{" "}
              - $
              {Number(query.priceRange.split("_")[1])
                ? query.priceRange.split("_")[1]
                : 0}
              <button
                onClick={() =>
                  setQuery({
                    ...query,
                    priceRange: "",
                  })
                }
              >
                <FaTimes />
              </button>
            </span>
          )}

          {/* Active popular Brands */}
          {query.popularBrands.length ? (
            query.popularBrands.map((brand: string, index: number) => {
              return (
                <span key={index} className="hidden md:flex items-center gap-2">
                  {brand}
                  <button
                    onClick={() =>
                      setQuery({
                        ...query,
                        popularBrands: query.popularBrands.filter(
                          (otherBrands: string) => brand !== otherBrands
                        ),
                      })
                    }
                  >
                    <FaTimes />
                  </button>
                </span>
              );
            })
          ) : (
            <></>
          )}

          {/* No active filters */}
          {!query.popularBrands.length &&
          !query.priceRange &&
          !query.subcategory ? (
            <span className="hidden md:flex items-center gap-2">
              No Active Filters
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className="whitespace-nowrap">
          {servicesRedux?.serverResponse?.data?.count} Results found.
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {servicesRedux.success ? (
          servicesRedux?.serverResponse?.data?.services?.map(
            (service: UserGetServiceType) => {
              return (
                <div className="flex flex-col gap-3 border rounded-md">
                  <img
                    className="h-[12rem] object-cover rounded-md"
                    src={
                      (service.image && service.image[0]?.url) || serviceImage11
                    }
                    alt=""
                  />
                  <div className="flex flex-col gap-3 p-2">
                    <div className="text-[#222325] font-[600]">
                      {service.name}
                    </div>
                    <div className="text-[#222325] h-20 line-clamp- 3font-[400]">
                      {service.brief_description}
                    </div>
                    <div className="flex flex-row gap-2 justify-start text-lg items-center text-[#EDB842]">
                      <AiFillStar /> <span>{service.rating}</span>
                      <span className="text-[#A2A6B0] whitespace-nowrap">
                        ({service.total_rating})
                      </span>
                    </div>
                    <hr />
                    <div className="flex flex-row gap-1 justify-between">
                      <button className="bg-[#EDB842] text-white p-2 rounded-md">
                        Access
                      </button>
                      <div className="flex flex-col gap-1 font-[700] text-[#404145]">
                        <span className="text-[#74767E] text-[11px]">
                          STARTING AT
                        </span>
                        <span>
                          $<FormatNumber price={service.current_price} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <></>
        )}
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
  );
};

export default ServiceBody;
