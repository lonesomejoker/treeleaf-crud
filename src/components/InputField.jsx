import React from "react";

const InputField = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  error,
  required = false,
  options,
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      {type === "select" ? (
        <select 
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`px-2 py-3 border-b-2 rounded-tr-xl rounded-bl-xl ${
            error ? "border-b-red-600" : "border-b-gray-200"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options && options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input 
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className={`px-2 py-3 border-b-2 rounded-tr-xl rounded-bl-xl ${
            error ? "border-b-red-600" : "border-b-gray-200"
          }`}
        />
      )}
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
};


export default InputField;
