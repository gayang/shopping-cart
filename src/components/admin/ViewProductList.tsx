import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import Product from "../../types/Product";
import FilterParams from "../../types/Filters";
import {
  fetchAllProductAsync,
  selectProduct,
  deleteProductAsync,
} from "../../redux/reducers/productsReducer";

//import UpdateProductInput from "../../types/UpdateProductInput";
import { Link, NavLink } from "react-router-dom";
import Pagination from "../common/Pagination";
import UpdateProductInput from "../../types/UpdateProductInput";
import Services from "../../services/productService";
import Loading from "../common/Loading";

function ViewProductList() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productsReducer);
  const [search, setSearch] = useState<string | undefined>();

  const [productList, setProductList] = useState<Product[]>([]);
  // const [itemSelected, setItemSelected] = useState<ProductShap>(Object);
  // const [search, setSearch] = useState<string | undefined>();
  const [itemDelete, setItemDelete] = useState<Product[]>();
  const [itemUpdate, setItemUpdate] = useState<UpdateProductInput>();
  const [error, setError] = useState<string | null>(null);
  const [dataCache, setDataCache] = useState<{ [page: number]: Product[] }>({});
  const [currentPage, setCurrentPage] = useState(1);
 //const [selectProduct, setSelectProduct] = useState<Product>();
  const [updateProduct, setUpdateProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 12;
  const [filters, setFilters] = useState<FilterParams>({
    perPage: 12,
    pageNo: 1,
    sorting: "",
    categoryId: "",
    maxPrice: 0,
    minPrice: 0,
  });
  const pageLimit = 5;
  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const currentItems = productList.slice((currentPage - 1) * itemsPerPage,  currentPage * itemsPerPage );
  const filteredData = currentItems.filter((p) => p.name.toLowerCase().includes(search?.toLowerCase() || ""));


  useEffect(() => {
    
    if (!dataCache[currentPage]) {
      fetchProducts(currentPage);
    } else {
      setProductList(dataCache[currentPage]);
    }
  }, [currentPage]);

  // const fetchProducts = (page: number) => {
  //   const aaa:Product[] = dispatch(fetchAllProductAsync(filters))
  //   setProductList(aaa);

  // };
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


  //Update product
  const handleUpdate = (item: Product) => {

    console.log("CLICKED PRODUCT ID", item);
    //setSelectProduct(item)
    setUpdateProduct(item);
    
    // const items = [...products];
    // const index = items.indexOf(item);
    // items[index] = { ...item };

  };

  //Delete product
  const handleDelete = (item: Product) => {
    const originalList = products;
    const newList = products.filter((p) => p._id !== item._id);
    setItemDelete(newList);
    try {
      dispatch(deleteProductAsync(item._id));
    } catch (error) {
      //if (error.respose && error.respose === 404)
      alert("This post has already been deleted.");
      //else {
      alert("An unexpected error occurred.");
      //}
    }
    setItemDelete(originalList);
  };
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="data-cotntainer-left">
        <h1>Product Management</h1>
        <div className="loadMoePrducts">
          <p>
            <NavLink to="../admin/add-product">
              <button className="btn-update">Add product</button>
            </NavLink>
          </p>
        </div>
        <input
          type="text"
          value={search}
          className="input-search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products.."
        />

        <p>Showing {filteredData.length} products</p>
        <table className="table">
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Title</th>
              <th>Category</th>
              <th>Stock count</th>
              <th>Size</th>
              <th>Price</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => {
              return (
                <tr className="product-grid" key={item._id}>
                  {/* <td>{item._id}</td> */}
                  <td>{item.name}</td>
                  <td>{item.category.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.sizes}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link
                      to={`${item._id}`}
                      onClick={() => dispatch(selectProduct(item))}
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>&nbsp;</div>
        <div className="margin-zero">
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
    </React.Fragment>
  );
}
export default ViewProductList;