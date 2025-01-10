import { toast, ToastOptions } from "react-hot-toast";
import { BiSolidBadgeCheck, BiSolidError } from "react-icons/bi";
import { MdErrorOutline } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";

export const DEFAULT_TOAST: ToastOptions = {
  style: {
    background: "#f3f4f6",
    color: "#475569",
  },
  icon: <RiErrorWarningLine />,
  className: "w-[375px] [&>div]:justify-start",
  position: "bottom-right",
  duration: 4000,
};

export const createCustomToast = (options: ToastOptions) => {
  return { ...DEFAULT_TOAST, ...options };
};

export const showToast = (message: string, options?: ToastOptions) => {
  return toast(message, options || DEFAULT_TOAST);
};

export const SUCCESS_TOAST = createCustomToast({
  style: {
    background: "#4CC88e",
    color: "#ffffff",
  },
  icon: <BiSolidBadgeCheck size={20} />,
  className: "w-[375px] [&>div]:justify-start",
  position: "bottom-right",
  duration: 4000,
});

export const DANGER_TOAST = createCustomToast({
  style: {
    background: "#ff4949",
    color: "#ffffff",
  },
  icon: <MdErrorOutline size={20} />,
  className: "w-[375px] [&>div]:justify-start",
  position: "bottom-right",
  duration: 4000,
});

export const WARNING_TOAST = createCustomToast({
  style: {
    background: "#ffc700",
    color: "#ffffff",
  },
  icon: <BiSolidError size={20} />,
  className: "w-[375px] [&>div]:justify-start",
  position: "bottom-right",
  duration: 4000,
});
