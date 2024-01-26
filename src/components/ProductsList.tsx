import React from "react";
import Product from "../types/Product";
import CardMedia from "@mui/material/CardMedia";

import { Button, CardActionArea, CardActions } from "@mui/material";

interface ProductProps {
  items: Product[];
}

function ProductList({ items }: ProductProps) {
  const handleTitleClick = () => {};

  return (
    <>
      <section className="container ">
        {items.map((item) => (
          <div className="product-grid" key={item._id}>
            <div className="product">
              {item.images.map((url: string, index: number) => (
                <CardMedia
                  sx={{ height: 140 }}
                  key={index}
                  image={url}
                  title={item.name}
                />
              ))}

              <p className="price">{item.price}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default ProductList;
