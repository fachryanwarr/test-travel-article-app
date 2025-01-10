import { TiHome } from "react-icons/ti";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const errorCode = (error as { status?: number }).status || 400;
  const errorMessage =
    (error as { statusText?: string }).statusText || "Page Not Found";

  return (
    <div className="bg-dark-primary">
      <div className="container flex flex-col items-center justify-center h-screen gap-3">
        <h1 className="text-9xl font-mono font-bold text-white/80">
          {errorCode}
        </h1>
        <h4 className="text-2xl font-bold capitalize text-white">
          {errorMessage}
        </h4>
        <Link to={"/"} className="mt-4">
          <button className="btn btn-lg btn-primary rounded-full min-w-32">
            <TiHome className="text-xl" />
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
