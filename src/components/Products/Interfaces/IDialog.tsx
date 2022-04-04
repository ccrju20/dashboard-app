import { Product, IProducts } from "./IProducts";

export type closeReason =
  | "backdropClick"
  | "escapeKeyDown"
  | "closeButtonClick";

export interface IDialog {
  open: boolean;
  close: (reason: closeReason) => void;
  product: Product;
  getProducts: IProducts["getProducts"];
}

export interface IDialogAdd {
  open: boolean;
  close: (reason: closeReason) => void;
  getProducts: IProducts["getProducts"];
}
