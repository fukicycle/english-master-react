import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ children, isShow, setIsShow }) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-dvh w-full p-4 flex justify-center items-center transition-opacity duration-300 ease-out bg-gray-300/50 ${
          isShow ? "opacity-100 z-50" : "z-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`rounded shadow-xl p-4 flex flex-col gap-2 bg-[var(--color-bg)] transition-transform duration-300 delay-50 ease-out min-w-60 min-h-40 ${
            isShow ? "scale-100" : "scale-75 pointer-events-none"
          }`}
        >
          <button
            className="bg-none shadow-none w-fit h-fit self-end"
            onClick={() => setIsShow(false)}
          >
            <IoCloseOutline className="size-6" />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
export default Modal;
