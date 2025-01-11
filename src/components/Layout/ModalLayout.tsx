import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import clsxm from "../../lib/clsxm";

type ModalLayoutProps = {
  children: React.ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  containerClassName?: string;
};

const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  setShowModal,
  containerClassName = "",
}) => {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      modalContainerRef.current &&
      !modalContainerRef.current.contains(event.target as Node)
    ) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <section className="modal">
      <div
        className={clsxm("modal-container", containerClassName)}
        ref={modalContainerRef}
      >
        {children}
      </div>
    </section>
  );
};

export default ModalLayout;
