import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsxm from "../../lib/clsxm";
import useAppStore from "../../store/useAppStore";

type LoadingButtonProps = {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline-primary";
  size?: "lg" | "md" | "sm" | "icon";
  className?: string;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  size = "lg",
  className = "",
}) => {
  const isLoading = useAppStore.useIsLoading();

  return (
    <button
      className={clsxm(
        "btn relative overflow-hidden",
        [
          [variant === "primary" && "btn-primary"],
          [variant === "outline-primary" && "btn-outline-primary"],
        ],
        [
          [size === "lg" && "btn-lg"],
          [size === "md" && "btn-md"],
          [size === "sm" && "btn-sm"],
          [size === "icon" && "btn-icon"],
        ],
        className
      )}
      type={type}
    >
      {isLoading && (
        <div className="absolute flex items-center justify-center w-full h-full z-[5] bg-black/50">
          <AiOutlineLoading3Quarters className="text-xl animate-spin" />
        </div>
      )}
      {children}
    </button>
  );
};

export default LoadingButton;
