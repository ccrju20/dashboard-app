import { Product } from "./IProducts";
import { IAddProductOption } from "./IProductForm";

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
  id: number;
  email: string;  
  firstname: string;  
  lastname: string; 
  phone: string;
  address?: string;
  addresstwo?: string;
  city?: string;  
  state?: string;
  postal?: string;
}

export interface IOrderItems {
  id: number;
  product: Product;
  productOption: IAddProductOption;
  quantity: number;
  total_price: number;
}
