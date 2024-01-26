import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

import { addItemToCart } from "../redux/reducers/cartReducer";
import { fetchAllProductAsync, selectProduct} from "../redux/reducers/productsReducer";
import { fetchByCategoryIdAsync } from "../redux/reducers/categoryReducer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import Services from "../services/productService";
import FilterParams from "../types/Filters";
import Product from "../types/Product";
import Category from "../types/Category";
import ShoppingCart from "../components/shoppingcart/ShoppingCart";
import Loading from "../components/common/Loading";
import Pagination from "../components/common/Pagination";

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productsReducer);
  const cart = useAppSelector((state) => state.cartReducer);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCache, setDataCache] = useState<{ [page: number]: Product[] }>({});
  const itemsPerPage = 12;

  const [filters, setFilters] = useState<FilterParams>({
    perPage: 12,
    pageNo: 1,
    sorting: "",
    categoryId: "",
    maxPrice: 0,
    minPrice: 0,
  });

  useEffect(() => {
    if (!dataCache[currentPage]) {
      fetchProducts(currentPage);
    } else {
      setProductList(dataCache[currentPage]);
    }
    fetchCategory();
  }, []);
  
  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dispatch(fetchAllProductAsync(filters));
      if (!data.payload) {
        throw new Error("Network response was not ok");
      }
      const total = data.payload;
      setDataCache((prev) => ({ ...prev, [page]: total }));

      if ("payload" in data && Array.isArray(data.payload)) {
        setProductList(data.payload);
      }
      
    } catch (error) {
        setError("Failed to fetch products");
    } finally {
        setIsLoading(false);
    }
  };
  
  const fetchCategory = async () => {
    const category = await Services.getByCategory();
    setCategory(category);
  }

  const pageLimit = 3;
  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const currentItems = productList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage );
  const filteredData = currentItems.filter((p) =>
    p.name.toLowerCase().includes(search?.toLowerCase() || "")
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (newFilters: FilterParams) => {
    setFilters({ ...filters, ...newFilters });
  };

  const onAddToCart = (payload: Product) => {
    dispatch(addItemToCart(payload));
  };

  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    const catProducts = await dispatch(fetchByCategoryIdAsync(category));
    if ('payload' in catProducts && Array.isArray(catProducts.payload)) {
      setProductList(catProducts.payload);
    }
  };
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="main-wrapper">
      <div className="column-left">
        <div className="filters">
          <h2>Product Search</h2>
          <input
            type="text"
            value={search}
            className="input-search"
            onChange={(e) => handleSearchChange(e)}
            placeholder="Search for products.."
          />
          <h2>Filters</h2>
          <h3>By Category</h3>
          <select
            name="category"
            className="form-control"
            onChange={handleSelectChange}
            
          >
            {category?.map((c) => {
              return (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              );
            })}
          </select>
          {/* <h3>By Price</h3>
          <div className="div-flex">
            <input
              type="text"
              value={filters.minPrice}
              className="input-search price"
              placeholder="Min price.."
            />
            <span>to</span>
            <input
              type="text"
              value={filters.maxPrice}
              className="input-search price"
              placeholder="Max price.."
            />
          </div> */}
        </div>
        <div>
          <ShoppingCart items={cart} />
        </div>
      </div>
      <div className="column-right">
        
        <section className="container">
          {filteredData.length === 0 && (
            <p className="warning">
              Sorry..! There are no product(s) to show under your keyword
              search.
            </p>
          )}
          {isLoading && <Loading />}
          {filteredData?.map((item) => {
            return (
              <div className="product-grid" key={item._id}>
                <div className="product">
                  <Link
                    to={`${item._id}`}
                    onClick={() => dispatch(selectProduct(item))}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
                      image={item.images[0]}
                      title={item.name}
                    />
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </Link>
                  <div className="btn-holder">
                    <p className="price">€ {item.price}</p>
                    <button
                      className="cart-btn"
                      onClick={() => onAddToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        {filteredData.length != 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageLimit={pageLimit}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
