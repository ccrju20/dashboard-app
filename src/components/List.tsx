import React from "react";

interface IProps {
  products: {
    id: number;
    name: string;
    description: string;
    img: string;
    category: string;
    active: number;
  }[];
}

const ProductList: React.FC<IProps> = ({ products }) => {
  const renderList = (): JSX.Element[] => {
    return products.map((product, index) => {
      return (
        <div key={index} >
          <p>id: {product.id}</p>
          <p>name: {product.name}</p>
          <p>description: {product.description}</p>
          <p>imgUrl: {product.img}</p>
          <p>category: {product.category}</p>
          <p>active: {product.active}</p>
        </div>
      );
    });
  };

  return (
    <>
      <h2>Product List</h2>
      {renderList()}
    </>
  );
};

export default ProductList;
