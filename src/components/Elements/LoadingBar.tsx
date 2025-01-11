import clsxm from "../../lib/clsxm";

const LoadingBar = () => {
  return (
    <div
      className={clsxm(
        "h-[1.5px] w-full bg-gray-300 fixed left-0 top-[80px] z-30"
      )}
    >
      <div className="loading-bar h-[1.5px] bg-primary-500"></div>
    </div>
  );
};

export default LoadingBar;
