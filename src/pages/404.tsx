import { FaArrowLeft } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { Link, useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const errorCode = (error as { status?: number }).status || 400;
  const errorMessage =
    (error as { statusText?: string }).statusText || "Page Not Found";

  const navigate = useNavigate();

  return (
    <div className="bg-dark-primary">
      <div className="container flex flex-col items-center justify-center h-screen gap-3">
        <h1 className="text-9xl font-mono font-bold text-white/80">
          {errorCode}
        </h1>
        <h4 className="text-2xl font-bold capitalize text-white">
          {errorMessage}
        </h4>
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            className="btn btn-lg btn-outline-primary rounded-full min-w-32"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="text-xl" />
            Back
          </button>
          <Link to={"/"}>
            <button className="btn btn-lg btn-primary rounded-full min-w-32">
              <TiHome className="text-xl" />
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
