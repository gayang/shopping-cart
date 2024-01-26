import React from "react";

const Input = ({
  name,
  label,
  value,
  error,
  type,
  onChange,
  className,
  multiple,
}: any) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={className}
        multiple={multiple}
      />
      {error && <div style={{ backgroundColor: '#ff8383' }}>{error}</div>}
    </div>
  );
};

export default Input;
