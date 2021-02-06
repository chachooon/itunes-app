import React, { forwardRef } from "react";
interface Props {
  onChange: () => void;
}

const SearchBox = forwardRef(
  ({ onChange }: Props, ref: React.Ref<HTMLInputElement>) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") onChange();
    };

    return (
      <div className="search-box__wrapper">
        <input
          ref={ref}
          type="search"
          placeholder="Search"
          className="search-box__input"
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  }
);

export default SearchBox;
