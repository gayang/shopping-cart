import React, { FormEvent, useEffect, useState } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Input from "../common/Input";
import Textarea from "../common/Textarea";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  createProductAsync,
  fetchByCategoryAsync,
} from "../../redux/reducers/productsReducer";
import CreateProductInput from "../../types/CreateProductInput";
import Category from "../../types/Category";
import { StringDecoder } from "string_decoder";
import { Message } from "@mui/icons-material";
import Loading from "../common/Loading";

type CategoryState = Category[];

const AddProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productData, setProductData] = useState<CreateProductInput>({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    sizes: [],
    images: [],
  });
  const [newImages, setNewImages] = useState<string>("");
  const [categories, setCategories] = useState<CategoryState>([]);
  const [category, setCategory] = useState<CategoryState>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("productData>>", productData);
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await dispatch(fetchByCategoryAsync());
      //setCategories(result.payload as CategoryState);
      setCategory(result.payload as CategoryState);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewImages(e.target.value);
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedCategory(e.target.value);
    console.log("Category ID>", e.target.value);
    console.log(selectedCategory);

    setProductData({ ...productData, [e.target.name]: e.target.value });
    console.log(selectedCategory);
  };

  const addImage = () => {
    //e.preventDefault();
    //const newImages
    if (newImages.length > 0) {
      setProductData((prevState) => ({
        ...prevState,
        images: [...(prevState.images ?? []), newImages],
      }));
    }

  };

  const handleEdit = (url: string) => {
    setNewImages(url);
  };

  const handleDelete = (url: string, index: number) => {
    console.log("Index>", index, " URL>", url);
    setNewImages(url);
    //setNewImages(newImages.filter((item) => item !== url));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      console.log("productData", productData);
      const data = await dispatch(createProductAsync(productData));
      //navigate("/admin/view-products");
      console.log("Response on product update page ", data);
      clearFormData();
      setLoading(false);
    } catch (err) {
      setError("Error adding product. Please try again.");
      setLoading(false);
    }
  };

  const clearFormData = () => {
    productData.name = "";
    productData.price = 0;
    productData.description = "";
    productData.category = "";
    productData.stock = 0;
    //setNewImages("");
    //productData.sizes: [],
    //images: [],
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="form">
      <h2>Add product</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={productData.name}
          label="Name"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
        <Input
          name="price"
          value={productData.price}
          label="Price"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
        <Textarea
          name="description"
          value={productData.description}
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
            value={selectedCategory}
            onChange={handleSelectCategory}
          >
            {category?.map((c) => {
              return (
                <option key="c._id" value={c._id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
        <Input
          name="stock"
          value={productData.stock}
          label="Stock"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
        <Input
          name="sizes"
          value={productData.sizes}
          label="Sizes"
          onChange={handleChange}
          type="text"
          className="form-control"
        />
        <div className="div-fx image-add-edit">
          {productData?.images?.map((url, index) => (
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
          <button className="form-btn" type="button" onClick={addImage}>
            Add/Edit image
          </button>
        </div>
        <p>
          <button className="form-btn" type="submit" id="submit">
            {loading ? <Loading /> : "Add Product"}
          </button>
          &nbsp;&nbsp;
          <button className="form-btn" type="submit" id="submit">
            Clear all
          </button>
        </p>
        <div>{error && <div style={{ color: "red" }}>{error}</div>}</div>
      </form>
      <p>
        <Link to="/admin/view-products">Back to products management</Link>
      </p>
    </div>
  );
};

export default AddProduct;
