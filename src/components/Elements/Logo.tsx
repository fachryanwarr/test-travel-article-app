import { getImage } from "../../lib/getImage";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={getImage("datacakra-logo.svg")}
        alt=""
        className="w-8 h-8 md:w-10 md:h-10"
      />
      <h1 className="text-xl md:text-2xl text-primary-400 font-bold">
        CakraTravel
      </h1>
    </div>
  );
};

export default Logo;
