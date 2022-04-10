import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { IProductForm } from "../../Interfaces/IProductForm";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  DialogContent,
  DialogTitle
} from "@mui/material";

const AddProductForm = () => {
  const {
    control,
    // formState: { errors },
    // watch,
  } = useFormContext<IProductForm>();
  const { fields, append, remove } = useFieldArray<
    IProductForm,
    "options",
    "optionId"
  >({ control, name: "options", keyName: "optionId" });

  // console.log(errors);
  // console.log(watch("options"));

  return (
    <>
      <DialogTitle> Add Product Options </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center">
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => append({ option_id: fields.length })}
          >
            Add
          </Button>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {fields.map((option, index) => (
            <Grid item xs={12} md={4} key={option.optionId}>
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
                    defaultValue={0}
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
                    defaultValue={0}
                    render={({ field, fieldState}) => (
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
                    defaultValue={0}
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
              <Button onClick={() => remove(index)}>Remove</Button>
            </Grid>
          ))}
          <br />
          <br />
          <br />
        </Grid>
      </DialogContent>
    </>
  );
};

export default AddProductForm;
