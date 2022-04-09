import { SubmitHandler, Control } from "react-hook-form";

export interface IProductForm {
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
  }

export interface IAddProductOption {
  option_id: number;
  price: number;
  size: number;
}
