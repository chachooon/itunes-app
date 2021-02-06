import React, { forwardRef } from "react";
interface Props {
  onChange: () => void;
}

const SearchBox = forwardRef(
  ({ onChange }: Props, ref: React.Ref<HTMLInputElement>) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") onChange();
    };

    return <input ref={ref} type="search" onKeyDown={handleKeyDown} />;
  }
);

export default SearchBox;
