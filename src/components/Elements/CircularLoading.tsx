import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsxm from "../../lib/clsxm";

const CircularLoading = ({ className }: { className?: string }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <AiOutlineLoading3Quarters
        className={clsxm("text-xl animate-spin", className)}
      />
    </div>
  );
};

export default CircularLoading;
