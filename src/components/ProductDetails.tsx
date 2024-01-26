import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CardMedia } from "@mui/material";

import { selectProduct } from "../redux/reducers/productsReducer";
import { addItemToCart } from "../redux/reducers/cartReducer";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import Product from "../types/Product";
import Pagination from "../components/common/Pagination";
import Services from "../services/productService";
import Loading from "./common/Loading";

function ProductDetails() {
  const dispatch = useAppDispatch();
  const products: any = useAppSelector((state) => state.productsReducer);
  const [item, setItem] = useState(Object);
  const [category, setCategory] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pageLimit = 0;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(category?.length / itemsPerPage);
  const currentItems = category?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setIsLoading(true);
    const data = products.selectedProduct?.category;
    const catId: any = data._id;
    setSelectedCategory(catId);
    getProductsByCategory();

    setSelectedImage(products.selectedProduct?.images[0]);
    setSelectedProduct(selectedProduct);
    setIsLoading(false);
  }, [selectedCategory]);

  const getProductsByCategory = async () => {
    if (selectedCategory !== undefined) {
      const data = await Services.getProductByCategoryId(selectedCategory);
      setCategory(data);
    }
  };

  const onAddToCart = (payload: Product) => {
    dispatch(addItemToCart(payload));
  };

  const handleImageClick = (e: number) => {
    const selectedImage = products.selectedProduct?.images[e];
    setSelectedImage(selectedImage);
  };

  const handleCategoryClick = (item: Product) => {
    dispatch(selectProduct(item));
    setSelectedImage(item.images[0]);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="cart-details">
      <div className="item-detail">
        <div className="item-detail-image">
          <img src={selectedImage} className="img-detail-view" width="400px" />
          <div className="dot-indicator">
            <ul className="indicator">
              {products.selectedProduct?.images.map(
                (image: string, index: number) => (
                  <button
                    key={index}
                    className="cart-dot-indicator cart-dot-active"
                    onClick={() => handleImageClick(index)}
                  ></button>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="item-detail-data">
          <h2>{products.selectedProduct?.name}</h2>
          <p>{products.selectedProduct?.description}</p>
          <h3>€{products.selectedProduct?.price}</h3>
          <div>
            <button
              className="cart-detail-btn"
              onClick={() => onAddToCart(item)}
            >
              Add to basket
            </button>
          </div>
          <p>
            <Link to="/products">Back to products</Link>
          </p>
        </div>
      </div>
      <div>
        <h2>You might also be interested:</h2>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageLimit={pageLimit}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <section className="container-two-row">
          {currentItems?.map((item: any) => {
            return (
              <div className="product-grid" key={item._id}>
                <div className="product">
                  <Link to={`../products/${item._id}`}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={item.images[0]}
                      title={item.name}
                      onClick={() => handleCategoryClick(item)}
                    />
                  </Link>
                  <h2>{item.name}</h2>

                  <p className="price">€ {item.price}</p>
                  <div className="btn-holder">
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
      </div>
    </div>
  );
}
export default ProductDetails;
