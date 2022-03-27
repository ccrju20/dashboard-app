import { useState } from "react";
import List from "./components/List";

interface IState {
  products: {
    id: number;
    name: string;
    description: string;
    img: string;
    category: string;
    active: number;
  }[];
}

const Products = () => {
  const [products, setProducts] = useState<IState["products"]>([
    {
      id: 1,
      name: "Cookiez",
      description: "chocolate chip cookies",
      img: "imgUrl",
      category: "cookie",
      active: 1,
    },
  ]);

  return (
    <>
      <h1>Products</h1>
      <List products={products} />
    </>
  );
};

export default Products;
