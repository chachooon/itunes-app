import React from "react";

const SelectBox = () => {
  return (
    <select>
      <option value="popular">인기 순</option>
      <option value="releaseDate">릴리즈 일자 순</option>
      <option value="name">이름 순</option>
    </select>
  );
};

export default SelectBox;
