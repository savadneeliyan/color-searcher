import { TextField } from "@mui/material";
import React from "react";

export const InputFields = ({ handleSubmit, ...props }) => {
  return (
    <form onSubmit={handleSubmit} className="input-fields">
      <label>Color</label>
      <input type="text" placeholder="Enter Color" {...props} />
      <input type="submit" hidden />
    </form>
  );
}


export const InputV2field = () => {
    return (
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    );
}
