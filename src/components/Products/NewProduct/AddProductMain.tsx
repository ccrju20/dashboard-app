import React, { useState } from "react";
import { IAddProductOption, IProductForm } from "../Interfaces/IProductForm";
import { IDialogAdd as Props } from "../Interfaces/IDialog";
import { object, string, number, array, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import AddProductForm from "./AddProductForm";
import AddNProductOptions from "./AddNProductOptions";
import Notification from "../Notification";

const productOptionSchema: SchemaOf<IAddProductOption> = object({
  option_id: number()
    .typeError("Must be a number greater than 1")
    .min(1)
    .required(),
  size: number().typeError("Must be a number greater than 1").min(1).required(),
  price: number()
    .typeError("Must be a number greater than 1")
    .min(1)
    .required(),
});

const productSchema = object({
  title: string().trim().min(1).required(),
  category: string().trim().min(1).required(),
  active: number().required(),
  img: string().trim().min(1).required(),
  description: string().trim().min(1).required(),
  options: array().of(productOptionSchema).required(),
}).required();

const AddProductMain: React.FC<Props> = ({ open, close, getProducts }) => {
  const methods = useForm<IProductForm>({
    resolver: yupResolver(productSchema),
  });
  const [notification, setNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [updateError, setUpdateError] = useState(false);

  const submitProduct: SubmitHandler<IProductForm> = (data: IProductForm) => {
    console.log(data);
    close("closeButtonClick");

    axios
      .post("api/v1/products", data)
      .then((res) => {
        console.log(res);
        setNotificationMsg(`Product ID: ${res.data.id} - Added Successfully!`);
        setNotification(true);
        getProducts();
      })
      .catch((err) => {
        console.log(err);
        setUpdateError(true);
        setNotificationMsg(err.message);
      });
  };

  const handleCloseNotification = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification(false);
  };

  return (
    <>
      <Dialog open={open} onClose={close} maxWidth="md" fullWidth={true}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitProduct)}>
            <AddProductForm />
            <Divider />
            <AddNProductOptions />
            <DialogActions>
              <Button type="submit"> Submit</Button>
              <Button
                onClick={() => {
                  close("closeButtonClick");
                  methods.clearErrors();
                  methods.reset();
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
      <Notification
        open={notification}
        close={handleCloseNotification}
        severity={!updateError ? "success" : "error"}
        message={notificationMsg}
      />
    </>
  );
};

export default AddProductMain;
