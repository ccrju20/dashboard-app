import TextField from "@mui/material/TextField";
import { EditProductOption as Props } from "./EditProduct";
import { Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

const EditProductOption: React.FC<Props> = ({
  formSubmitHandler,
  productOptions,
  controlProduct,
  errors,
}) => {
  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        {productOptions?.map((option, index) => {
          return (
            <Grid item xs={12} md={4} key={index}>
              <br />
              <Card elevation={3}>
                <CardContent>
                  <Grid container justifyContent="center">
                    <Avatar>{index + 1}</Avatar>
                  </Grid>
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
    </>
  );
};

export default EditProductOption;
