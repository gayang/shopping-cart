import React from "react";

const Textarea = ({ name, label, value, error, onChange, className }: any) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      ></textarea>
      {error && <div>{error}</div>}
    </div>
  );
};
export default Textarea;
