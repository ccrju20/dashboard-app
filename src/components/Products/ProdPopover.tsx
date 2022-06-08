import React, { useEffect, useState, useContext } from "react";
import { IPopover as Props } from "./List";
import { Grid, Typography, Popover, Box, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const ProdPopover: React.FC<Props> = ({
  id,
  open,
  anchorEl,
  onClose,
  deleteProduct,
  handleCloseDeleteProd,
  popoverProd,
}) => {
    
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography variant="body1" sx={{ p: 2 }} color="primary">
          <InfoIcon sx={{ marginBottom: -0.5, marginRight: 1 }} />
          Item can only be deleted from the database if no existing orders
          contain the Item (for historical data logging)
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="caption" color="text.secondary">
            Mark the item as inactive to "soft delete", if it cannot be
            deleted or is attached to orders
          </Typography>
        </Box>

        <Grid container justifyContent="center">
          <Button
            onClick={() => {
              deleteProduct(popoverProd);
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={() => {
              handleCloseDeleteProd();
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Popover>
    </>
  );
};

export default ProdPopover;
