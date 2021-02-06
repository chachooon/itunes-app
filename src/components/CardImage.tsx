import React from "react";

interface Props {
  src: string;
}

const CardImage = ({ src }: Props) => {
  return (
    <div className="card-image">
      <img src={src} />
    </div>
  );
};

export default CardImage;
