export interface IProducts {
    products: {
      id: number;
      title: string;
      description: string;
      img: string;
      category: string;
      active: number;
      options: {
        id: number;
        option_id: number;
        price: number;
        size: number;
      }[];
    }[];
    getProducts: () => void;
  }

  export type Product = {
    id: number;
    title: string;
    description: string;
    img: string;
    category: string;
    active: number;
    options: {
      id: number;
      option_id: number;
      price: number;
      size: number;
    }[];
  };
  