import TextField from "@mui/material/TextField";
import { IProductForm } from "../Interfaces/IProductForm";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

const EditProductOption = () => {
  const {
    control,
    formState: { errors },
    watch
  } = useFormContext();

  const { fields } = useFieldArray<IProductForm, "options", "option_id">({
    name: "options",
    keyName: "option_id",
  });

  console.log(watch('options'));
  console.log(errors);
  console.log(errors.options);

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        {fields.map((field, index, errors) => {
          return (
            <Grid item xs={12} md={4} key={field.option_id}>
              <br />
              <Card elevation={3}>
                <CardContent>
                  <Grid container justifyContent="center">
                    <Avatar>{index + 1}</Avatar>
                  </Grid>
                  <br />
                  <Controller
                    name={`options.${index}.option_id`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="SKU"
                        size="small"
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                  <br />
                  <br />
                  <Controller
                    name={`options.${index}.size`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Size"
                        size="small"
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                  <br />
                  <br />
                  <Controller
                    name={`options.${index}.price`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Price"
                        size="small"
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
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
