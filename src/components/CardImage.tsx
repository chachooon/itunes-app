import React from "react";
import { HTMLAttributes } from "react";

interface Props {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
}

const CardImage = (props: Props) => {
  return <img className="card_image" {...props} />;
};

export default CardImage;
