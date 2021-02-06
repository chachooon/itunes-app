import React from "react";
interface Props {
  onClick: () => void;
}
const Card: React.FC<Props> = ({ onClick, children }) => {
  return (
    <div className="card-container" onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
