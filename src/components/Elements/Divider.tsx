import clsxm from "../../lib/clsxm";

const Divider = ({ className }: { className?: string }) => {
  return <div className={clsxm("w-full h-[1px] bg-white", className)}></div>;
};

export default Divider;
