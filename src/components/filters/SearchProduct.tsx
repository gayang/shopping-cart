import React, { useEffect, useState } from "react";
import Product from "../../types/Product";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

interface SearchProdcutProps {
  items: Product[];
  onSearchProduct: (name: string) => void;
}

function SearcProduct({ items, onSearchProduct }: SearchProdcutProps) {
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string | undefined>();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search?.toLowerCase() || "")
  );

  useEffect(() => {
    if (search) {
    }
  }, [search]);
  return (
    <div>
      <input
        className="input-search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearcProduct;
