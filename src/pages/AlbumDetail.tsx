import React, { useEffect, useState } from "react";
import { Album } from "../Models";
interface Props {
  onClose: () => void;
  selectedAlbum: Album;
  open: boolean;
}
const AlbumDetail = ({ onClose, selectedAlbum, open }: Props) => {
  return <></>;
};
export default AlbumDetail;
