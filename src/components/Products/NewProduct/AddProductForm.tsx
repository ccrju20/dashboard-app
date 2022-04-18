import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { IProductForm } from "../../Interfaces/IProductForm";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Grid,
  Switch,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const AddProductForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IProductForm>();

  const [active, setActive] = useState(0);

  return (
    <>
      <DialogTitle>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6}>
            <AddCircleOutlineIcon /> Add Product
          </Grid>

          <Grid item xs={10} sm={6} mt={2}>
            <Grid container justifyContent={{ md: "flex-end" }}>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Category"
                    variant="outlined"
                    size="small"
                    error={!!errors.category}
                    helperText={errors.category ? errors.category?.message : ""}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>

      <Grid container justifyContent="center">
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title ? errors.title?.message : ""}
            />
          )}
        />
        <Box ml={2}>
          <DialogContentText mb={-1}>Active:</DialogContentText>
          <Controller
            name="active"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                checked={active === 1}
                onChange={(event, value) => {
                  onChange(value ? 1 : 0);
                  value ? setActive(1) : setActive(0);
                }}
              />
            )}
          />
        </Box>
      </Grid>
      <br />
      <DialogContent>
        <br />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description ? errors.description?.message : ""}
            />
          )}
        />
        <br />
        <br />
        <Controller
          name="img"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Image"
              fullWidth
              variant="outlined"
              error={!!errors.img}
              helperText={errors.img ? errors.img?.message : ""}
            />
          )}
        />
        <br />
        <br />
      </DialogContent>
    </>
  );
};

export default AddProductForm;
