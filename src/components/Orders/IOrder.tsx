import { Product } from "../Products/Interfaces/IProducts";
import { IAddProductOption } from "../Products/Interfaces/IProductForm";

export interface IOrder {
  id: number;
  ordernumber: string;
  dateposted: Date;
  scheduled: string;
  status: string;
  delivery: number;
  account: string;
  orderDetails: IOrderDetails;
  orderItems: IOrderItems[];
}

export interface IOrderDetails {
  address: string;
  addresstwo: string;
  city: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  phone: string;
  postal: string;
  state: string;
}

export interface IOrderItems {
  id: number;
  product: Product;
  productOption: IAddProductOption;
  quantity: number;
  total_price: number;
}
