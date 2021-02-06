import React, { forwardRef } from "react";
interface Props {
  label?: string;
  options: Option[];
  onChange: () => void;
}

interface Option {
  value: string | number;
  label: string;
}

const SelectBox = forwardRef(
  ({ label, options, onChange }: Props, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <div className="selectbox">
        <select id="select" ref={ref} name={label} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectBox;
