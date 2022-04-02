import TextField from "@mui/material/TextField";
import { EditProductOption as Props } from "./EditProduct";
import { Controller, SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

interface IFormOptionInputs {
  option_id: number;
  price: number;
  size: number;
  product: {
    id: number;
  };
}
const EditProductOption: React.FC<Props> = ({
  formSubmitHandler,
  productOptions,
  controlProduct,
  errors,
}) => {
  const [newOption, setNewOption] = useState(false);
  const PRODUCT_OPTIONS_API_URL = "api/v1/products/options";

  //   const addOption: SubmitHandler<IFormInputs> = (option: IFormInputs) => {
  //     console.log(option);
  //     axios.post("PRODUCT_OPTIONS_API_URL", option).then((res) => {
  //       console.log(res);
  //     });
  //   };

  const optionsLength = productOptions.length;
  console.log(optionsLength);
  return (
    <>
      <Grid container justifyContent="center">
        <Button
          size="small"
          onClick={() => {
            setNewOption(true);
            console.log("new option");
          }}
        >
          + Add New Option
        </Button>
        <Grid container spacing={3} justifyContent="center">
          {newOption && (
            <>
              <Card elevation={3}>
                <Button
                  size="small"
                  onClick={() => {
                    setNewOption(false);
                    console.log("remove option");
                  }}
                >
                  Remove
                </Button>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    New Option
                  </Typography>
                  <br />
                  <Controller
                    name={`options.${optionsLength}.option_id`}
                    control={controlProduct}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="SKU"
                        size="small"
                        variant="outlined"
                        error={!!errors.sku}
                        helperText={errors.sku ? errors.sku?.message : ""}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </>
          )}
          {productOptions?.map((option, index) => {
            return (
              <Grid item xs={4} md={4} key={index}>
                <br />
                <Card elevation={3}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Option {index + 1}
                    </Typography>
                    <br />
                    <Controller
                      name={`options.${index}.option_id`}
                      control={controlProduct}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="SKU"
                          size="small"
                          variant="outlined"
                          error={!!errors.sku}
                          helperText={errors.sku ? errors.sku?.message : ""}
                        />
                      )}
                    />
                    <br />
                    <br />
                    <Controller
                      name={`options.${index}.size`}
                      control={controlProduct}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Size"
                          size="small"
                          variant="outlined"
                          error={!!errors.size}
                          helperText={errors.size ? errors.size?.message : ""}
                        />
                      )}
                    />
                    <br />
                    <br />
                    <Controller
                      name={`options.${index}.price`}
                      control={controlProduct}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Price"
                          size="small"
                          variant="outlined"
                          error={!!errors.price}
                          helperText={errors.price ? errors.price?.message : ""}
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default EditProductOption;
