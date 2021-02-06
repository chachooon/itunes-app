import React, { useRef, useEffect } from "react";
interface Props {
  open: boolean;
  onClose: () => void;
}
const Modal: React.FC<Props> = ({ open, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect((): void => {
    if (open) {
      modalRef.current.classList.remove("closed");
    } else {
      modalRef.current.classList.add("closed");
    }
  }, [open]);

  return (
    <div ref={modalRef} className="closed">
      <div className="modal_overlay" id="modal-overlay"></div>

      <div className="modal" id="modal">
        <button className="close_button" id="close-button" onClick={onClose}>
          X
        </button>
        <div className="modal_content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
