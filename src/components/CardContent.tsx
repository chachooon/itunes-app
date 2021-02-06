import React from "react";

interface Props {}

const CardContent: React.FC = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

export default CardContent;
