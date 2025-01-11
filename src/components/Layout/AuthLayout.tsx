import { Outlet } from "react-router-dom";
import { getImage } from "../../lib/getImage";

const AuthLayout = () => {
  return (
    <main className="h-screen grid md:grid-cols-2">
      <div className="h-full bg-dark-surface relative max-md:hidden">
        <img
          src={getImage("datacakra-authBg.jpg")}
          alt="Auth Background"
          className="absolute h-full w-full object-cover -z-0"
        />
      </div>
      <div className="h-screen overflow-y-auto flex flex-col gap-5 justify-center p-10">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
