import { useCallback, useEffect, useState } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaFilter, FaTimes } from "react-icons/fa";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import slugify from "slugify";
import { productImage7 } from "../../images/products";
import { userGetProductsAction } from "../../redux/actions/userDashboard/products.action";
import { USER_GET_PRODUCTS_RESET } from "../../redux/constants/userDashboard/products.constants";
import { ReducersType } from "../../redux/store";
import { ReduxResponseType } from "../../redux/types/general.types";
import {
  UserGetProductType,
  userGetProductsType,
} from "../../redux/types/products.types";
import { FormatNumber } from "../shareables/FormatNumber";
import { Ratings } from "../shareables/Ratings";
import inWishlist from "../../utils/checkWhishlist";
import { toast } from "react-toastify";
import {
  ProductNav,
  ProductPopularBrands,
  ProductPopularTags,
  ProductPriceRange,
} from "./FilterProductsNav";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../redux/actions/wishlist.actions";
import { WishlistItemType } from "../../redux/types/wishlist.types";

export type QueryType = {
  page: number;
  search: string;
  subcategory: string;
  priceRange: string;
  popularBrands: string[];
  sortBy: string;
};

const ProductBody = () => {
  const [query, setQuery] = useState<QueryType>({
    page: 0,
    search: "",
    subcategory: "",
    priceRange: "",
    popularBrands: [],
    sortBy: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2 px-5 justify-between overflow-x-scroll md:hidden py-3">
        <button
          type="button"
          className="flex gap-2 items-center p-2 border-2 text-[#5F6C72] border-[#EDB842] bg-[#EDB84220] rounded-lg w-fit"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="whitespace-nowrap">All Filters</span> <FaFilter />
        </button>
        <button
          type="button"
          className="flex gap-2 items-center p-2 border-2 text-[#5F6C72] border-[#EDB842] bg-[#EDB84220] rounded-lg w-fit"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="whitespace-nowrap">Category Search</span>{" "}
          <span className="text-2xl">
            <RiArrowDownSFill />
          </span>
        </button>
        <button
          type="button"
          className="flex gap-2 items-center p-2 border-2 text-[#5F6C72] border-[#EDB842] bg-[#EDB84220] rounded-lg w-fit"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="whitespace-nowrap">Price range</span>
          <span className="text-2xl">
            <RiArrowDownSFill />
          </span>
        </button>
      </div>
      <div className="flex flex-row px-5 py-3 md:py-6">
        <ProductBodyNavMain
          query={query}
          setQuery={setQuery}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <ProductBodyMain query={query} setQuery={setQuery} />
      </div>
    </div>
  );
};

export const ProductBodyNavMain = ({
  query,
  setQuery,
  isOpen = false,
  setIsOpen,
}: {
  query: QueryType;
  setQuery: any;
  isOpen?: boolean;
  setIsOpen?: any;
}) => {
  return (
    <div
      className={`${
        isOpen
          ? "flex md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 rounded-t-2xl border-t-4 shadow-md overflow-y-auto h-[100vh] z-50 animate__animated animate__slideInUp"
          : "md:flex hidden w-3/12 px-3 py-4"
      } flex-col gap-3`}
    >
      <div className="flex p-2 justify-between">
        <span className="text-2xl font-[600]">Filter results</span>{" "}
        <button
          className="absolute top-3 right-3 block md:hidden text-2xl"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>
      </div>
      <ProductNav query={query} setQuery={setQuery} />
      <ProductPriceRange query={query} setQuery={setQuery} />
      <ProductPopularBrands query={query} setQuery={setQuery} />
      <ProductPopularTags />
    </div>
  );
};

const ProductBodyMain = ({
  query,
  setQuery,
}: {
  query: QueryType;
  setQuery: any;
}) => {
  const limit: number = 20;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [queryString, setQueryString] = useState<string>("");
  const [dotIndex, setDotIndex] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [productsState, setProductsState] = useState<userGetProductsType>();

  useEffect(() => {
    setTimeout(() => {
      const searchParams = new URLSearchParams(location.search);
      const isEmpty = searchParams.entries().next().done;

      if (!isEmpty) {
        const queryObj = Object.fromEntries(searchParams.entries());
        setQuery((prev: QueryType) => {
          return {
            ...prev,
            ...queryObj,
          };
        });
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update query and url
  const updateQueryString = useCallback(
    (newParams: QueryType) => {
      const searchParams = new URLSearchParams(location.search);
      // Update or add new parameters
      Object.entries(newParams).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          (value as string[]).length !== 0 &&
          value !== 0
        ) {
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

  const productsRedux = useSelector(
    (state: ReducersType) => state?.userGetProducts
  ) as ReduxResponseType<userGetProductsType>;

  useEffect(() => {
    if (productsRedux.success) {
      setTotalPages(
        Math.ceil(Number(productsRedux?.serverResponse?.data?.count) / limit)
      );
      setProductsState(productsRedux?.serverResponse?.data);
      dispatch({ type: USER_GET_PRODUCTS_RESET });
    }
  }, [productsRedux?.success, productsRedux?.serverResponse?.data, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      updateQueryString(query);
    }, 1500);
  }, [query, updateQueryString]);

  useEffect(() => {
    dispatch(userGetProductsAction(queryString) as any);
  }, [dispatch, queryString]);

  // add to wishlist
  const addToWishlist = useCallback(
    (item: WishlistItemType) => {
      setTimeout(() => {
        dispatch(addToWishlistAction(item) as any);

        // send toast message
        toast("Added to Wishlist!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    },
    [dispatch]
  );

  const deleteWishlistItem = useCallback(
    (item: WishlistItemType) => {
      setTimeout(() => {
        dispatch(removeFromWishlistAction(item) as any);

        // send toast message
        toast("Removed from Wishlist!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    },
    [dispatch]
  );

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
              setQuery({ ...query, search: event.target.value, page: 1 });
            }}
          />
        </div>
        <div className="flex flex-row gap-2 items-center text-[#5F6C72]">
          <label htmlFor="sortBy">Sort by:</label>
          <select
            className="border-[2px] border-[#E4E7E9] p-2 rounded-md"
            name=""
            value={query.sortBy}
            id="sortBy"
            onChange={(event) =>
              setQuery({ ...query, sortBy: event.target.value, page: 1 })
            }
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">Alphabetical (A - Z)</option>
            <option value="z-a">Alphabetical (Z - A)</option>
          </select>
        </div>
      </div>

      <div className="bg-[#EDB84233] flex flex-row gap-2 justify-between p-2 rounded-md text-[#5F6C72] font-[600]">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <span className="font-[400] whitespace-nowrap">Active Filters:</span>
          {/* Active subategory filter */}
          {query?.subcategory && (
            <span className="flex items-center gap-2 whitespace-nowrap">
              {query.subcategory}
              <button
                onClick={() =>
                  setQuery({
                    ...query,
                    subcategory: "",
                    page: 1,
                  })
                }
              >
                <FaTimes />
              </button>
            </span>
          )}

          {/* Active price range */}
          {query?.priceRange && (
            <span className="flex items-center gap-2 whitespace-nowrap">
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
                    page: 1,
                  })
                }
              >
                <FaTimes />
              </button>
            </span>
          )}

          {/* Active popular Brands */}
          {query?.popularBrands.length ? (
            query.popularBrands.map((brand: string, index: number) => {
              return (
                <span
                  key={index}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  {brand}
                  <button
                    onClick={() =>
                      setQuery({
                        ...query,
                        popularBrands: query.popularBrands.filter(
                          (otherBrands: string) => brand !== otherBrands
                        ),
                        page: 1,
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
          {!query.priceRange && !query.subcategory ? (
            <span className="flex items-center gap-2 whitespace-nowrap">
              No Active Filters
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className="whitespace-nowrap">
          {productsState?.count} Results found.
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsState ? (
          productsState?.products?.map((product: UserGetProductType) => {
            return (
              <div
                key={product._id}
                className="p-3 flex flex-col gap-3 hover:p-2"
              >
                <img
                  className="h-[12rem] object-cover rounded-md"
                  src={
                    (product.image && product.image[0]?.url) || productImage7
                  }
                  alt=""
                />
                <div className="flex flex-row gap-1 justify-between">
                  <Ratings rating={product.rating} />
                  <span className="text-[#A2A6B0] whitespace-nowrap">
                    Reviews ({product.total_rating})
                  </span>
                </div>
                <div className="h-[3rem]">{product.name}</div>
                <div className="flex flex-row gap-1">
                  <div className="text-lg font-[700]">
                    $<FormatNumber price={product.current_price} />
                  </div>
                  <div className="text-[#666666] line-through">
                    {product.old_price && "$"}
                    {product.old_price ? (
                      <FormatNumber price={product.old_price} />
                    ) : (
                      <div className="invisible">hi</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-1 justify-between">
                  <button
                    onClick={() =>
                      navigate(
                        `/product/details/${product._id}/${slugify(
                          product.name
                        )}`
                      )
                    }
                    className="flex flex-row gap-1 font-[600] whitespace-nowrap text-[#EDB842] items-center"
                  >
                    Shop now
                  </button>
                  <div
                    onClick={() => {
                      if (
                        inWishlist({
                          ...product,
                          isProduct: true,
                          sub_category: "",
                        })
                      ) {
                        deleteWishlistItem({
                          ...product,
                          isProduct: true,
                          sub_category: "",
                        });
                      } else {
                        addToWishlist({
                          ...product,
                          isProduct: true,
                          sub_category: "",
                        });
                      }
                    }}
                    className="text-xl rounded-full"
                  >
                    <ProductLikeButton
                      defaultValue={inWishlist({
                        ...product,
                        isProduct: true,
                        sub_category: "",
                      })}
                    />
                  </div>
                </div>
              </div>
            );
          })
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
const ProductLikeButton = ({ defaultValue }: { defaultValue?: boolean }) => {
  const [like, setLike] = useState<boolean>(defaultValue || false);
  return (
    <button onClick={() => setLike(!like)}>
      {like ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
    </button>
  );
};

export default ProductBody;
