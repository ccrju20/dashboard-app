import { Product, IProducts } from "./IProducts";
import { IOrder } from './IOrder'

export type closeReason =
  | "backdropClick"
  | "escapeKeyDown"
  | "closeButtonClick";

export interface IDialog {
  open: boolean;
  close: (reason: closeReason) => void;
  product?: Product;
  getProducts: IProducts["getProducts"];
}

export interface IDialogOrder {
  open: boolean;
  close: (reason: closeReason) => void;
  order: IOrder;
  orderNumbers?: string[];
  getOrders: () => void;
  setSelectionModel?: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<IOrder[]>>
}