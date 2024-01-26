import React, { FormEvent, useEffect, useState } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  updateProductAsync,
} from "../../redux/reducers/productsReducer";
import UpdateProductInput from "../../types/UpdateProductInput";
import CreateProductInput from "../../types/CreateProductInput";
import Product from "../../types/Product";
import Category from "../../types/Category";
import useAppSelector from "../../hooks/useAppSelector";
import Services from "../../services/productService";
import ProductsReducerState from "../../types/ProductsReducerState";
import Loading from "../common/Loading";

type CategoryState = Category[];

const UpdateProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.productsReducer);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [item, setItem] = useState<CreateProductInput>();
  const [category, setCategory] = useState<Category[]>();
  const [newImages, setNewImages] = useState<string>("");
  const [selectProduct, setSelectProduct] = useState<Product>();
  const emptyProduct: Product = {
    _id: "",
    name: "",
    price: 0,
    description: "",
    images: [],
    category: {_id: "", name:""},
    stock: 0,
    sizes: [],
  };
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [productUpdate, setProductUpdate] =  useState<ProductsReducerState>();

  console.log("EIDT PRODUCT >> ", selectProduct);
  console.log("EIDT PRODUCT >> ", selectedProduct);

    useEffect(() => {
      // if (selectedProduct) {
      //   setProduct(selectedProduct);
      // } else {
      //   setProduct(emptyProduct);
      // }

      fetchProducts();
      //setSelectedProduct(selectedProduct);
      console.log("selectProduct", selectProduct);
    }, [selectedProduct]);
  
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const category = await Services.getByCategory();
      console.log("category", category);

      // if (!data.payload) {
      //   throw new Error("Network response was not ok");
      // }

      setCategory(category);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log("NOW", e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("UPADETED DATA", product)
    dispatch(updateProductAsync(product));
  };




  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImages(e.target.value);
  };
  const addImageUrl = () => {
    setProduct((prevState) => ({ ...prevState, images: [...prevState.images, newImages] }));
    //setSelectedProduct(setProduct);
    setNewImages("");
  };

  const handleEdit = (url:string) => {
    setNewImages(url);
  }
  const handleDelete = (url: string, index: number) => {
    console.log("Index>", index, " URL>", url)
    //setNewImages(url);
  };

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <div className="form">
      <h2>Update product</h2>

      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={product.name}
          label="Name"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
        <Input
          name="price"
          value={selectedProduct.selectedProduct?.price}
          label="Price"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
        <Textarea
          name="description"
          value={selectedProduct.selectedProduct?.description}
          label="Description"
          onChange={handleChange}
          className="form-control"
          type="text"
          row="6"
          multiple={true}
        />
        <div className="form">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            className="form-control"
            value={selectedProduct.selectedProduct?.category._id}
          >
            {category?.map((c) => {
              return (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
        <Input
          name="stock"
          value={selectedProduct.selectedProduct?.stock}
          label="Stock"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
        <Input
          name="sizes"
          value={selectedProduct.selectedProduct?.sizes}
          label="Sizes"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
        <div className="div-fx image-add-edit">
          {selectedProduct.selectedProduct?.images.map((url, index) => (
            <p key={index} className="margin-r">
              <span className="pos-abs div-fx">
                <button className="btn btn-sm" onClick={() => handleEdit(url)}>
                  Edit
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => handleDelete(url, index)}
                >
                  Delete
                </button>
              </span>
              <img key={index} src={url} width="180px" />
            </p>
          ))}
          {product.images.map((url, index) => (
            <p key={index} className="margin-r">
              <span className="pos-abs">
                <button
                  className="btn btn-sm pos-abs"
                  onClick={() => handleEdit(url)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => handleDelete(url, index)}
                >
                  Delete
                </button>
              </span>
              <img key={index} src={url} width="100%" />
            </p>
          ))}
        </div>
        <div className="div-fx">
          <Input
            name="images"
            id="images"
            value={newImages}
            label="Images"
            onChange={handleImageChange}
            type="text"
            className=""
            accept="image/*"
          />
          &nbsp;&nbsp;&nbsp;
          <button className="form-btn" type="button" onClick={addImageUrl}>
            Add/Edit image
          </button>
        </div>

        <p>
          <button className="form-btn" type="submit" id="submit">
            Update
          </button>
        </p>
      </form>
      <p>
        <Link to="/admin/view-products">Back to products management</Link>
      </p>
    </div>
  );
};

export default UpdateProduct;
