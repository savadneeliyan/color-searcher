import React from "react";

function InputFields({ handleSubmit, ...props }) {
  return (
    <form onSubmit={handleSubmit} className="input-fields">
      <label>Color</label>
      <input type="text" placeholder="Enter Color" {...props} />
      <input type="submit" hidden />
    </form>
  );
}

export default InputFields;
