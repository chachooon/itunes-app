import React from "react";

interface Props {
  children?: React.ReactElement;
}

const Card = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Card;
