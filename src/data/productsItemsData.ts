import {
  productImage1,
  productImage2,
  productImage3,
  productImage4,
  productImage5,
  productImage6,
  productImage7,
  productImage8,
  productImage9,
  productImageA,
  productImageB,
  productImageC,
  productImageD,
  productImageE,
  productImageF,
} from "../images/products";

export type productItemsType = {
  image?: string;
  priceoff?: null | string;
  pricenow?: number;
  pricebefore?: number;
  name?: string;
  body?: string;
  hot?: boolean;
  sold?: boolean;
  rating?: number;
  totalrating?: number;
  like?: boolean;
  date?: string;
  status?: string;
  sku?: number;
  variants?: number;
  stock?: number;
  availablestatus?: string;
  category?: string;
};

export const ProductsItemsdata: Array<productItemsType> = [
  {
    image: productImage1,
    priceoff: "32% OFF",
    hot: true,
    pricenow: 442.12,
    pricebefore: 865.99,
    name: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Versio...",
    body: "Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.",
    rating: 5,
    totalrating: 52677,
    like: true,
    date: "Jul 13, 2021",
    status: "IN STOCK",
    sku: 302012,
    variants: 3,
    stock: 80,
    availablestatus: "Published",
    category: "Audio",
  },
  {
    image: productImage2,
    sold: true,
    pricenow: 2300,
    name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
    rating: 4,
    totalrating: 52677,
    like: true,
    date: "Jul 13, 2021",
    status: "EXPIRE",
    sku: 302014,
    variants: 1,
    stock: 13,
    availablestatus: "Published",
    category: "Audio",
  },
  {
    image: productImage3,
    pricenow: 220,
    name: "Simple Mobile 4G LTE Prepaid Smartphone",
    like: true,
    rating: 3.4,
    totalrating: 52677,
    date: "Jul 13, 2021",
    status: "IN STOCK",
    sku: 302015,
    variants: 3,
    stock: 9,
    availablestatus: "Low Stock",
    category: "Audio",
  },
  {
    image: productImage4,
    priceoff: "19% OFF",
    pricebefore: 865,
    pricenow: 150,
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    like: false,
    rating: 5,
    totalrating: 52677,
    date: "Jul 13, 2021",
    status: "IN STOCK",
    sku: 302016,
    variants: 5,
    stock: 6,
    availablestatus: "Out of Stock",
    category: "Watch",
  },
  {
    image: productImage5,
    pricenow: 1200,
    name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
    like: true,
    rating: 5,
    totalrating: 52677,
    date: "Jul 13, 2021",
    status: "EXPIRE",
    sku: 302017,
    variants: 4,
    stock: 4,
    availablestatus: "Published",
    category: "Smartphone",
  },
  {
    image: productImage6,
    pricenow: 299,
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    like: false,
    rating: 5,
    totalrating: 52677,
    date: "Jul 13, 2021",
    status: "EXPIRE",
    sku: 302018,
    variants: 4,
    stock: 16,
    availablestatus: "Draft",
    category: "Audio",
  },
  {
    image: productImage7,
    pricebefore: 865.99,
    pricenow: 70,
    name: "Portable Wshing Machine, 11lbs capacity Model 18NMFIAM",
    like: false,
    rating: 5,
    totalrating: 52677,
    date: "Jul 13, 2021",
    status: "IN STOCK",
    sku: 302019,
    variants: 9,
    stock: 38,
    availablestatus: "Low Stock",
    category: "Smartphone",
  },
  {
    image: productImage8,
    hot: true,
    pricenow: 160,
    name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
    like: false,
    rating: 5,
    totalrating: 52677,
    date: "Jul 13, 2021",
    status: "IN STOCK",
    sku: 302020,
    variants: 1,
    stock: 18,
    availablestatus: "Draft",
    category: "Shoes",
  },
  {
    image: productImage9,
    priceoff: "32% OFF",
    pricebefore: 360,
    pricenow: 250,
    name: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker - Black",
    like: false,
    rating: 5,
    totalrating: 52677,
    date: "Jul 13, 2021",
    status: "EXPIRE",
    sku: 302021,
    variants: 3,
    stock: 8,
    availablestatus: "Low Stock",
    category: "Shoes",
  },
];

export const ProductsItemsdata2: Array<productItemsType> = [
  {
    image: productImageA,
    name: "Computer & Laptop",
  },
  {
    image: productImageB,
    name: "SmartPhone",
  },
  {
    image: productImageC,
    name: "Headphones",
  },
  {
    image: productImageD,
    name: "Accessories",
  },
  {
    image: productImageE,
    name: "Camera & Photo",
  },
  {
    image: productImageF,
    name: "TV & Homes",
  },
];
