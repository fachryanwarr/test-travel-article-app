import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { homepageBanners } from "../../../contents/homepageBanner";
import clsxm from "../../../lib/clsxm";
import { DANGER_TOAST, showToast, WARNING_TOAST } from "../../../lib/toast";
import useAppStore from "../../../store/useAppStore";
import { getImage } from "../../../lib/getImage";

const HomeBanner = () => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const setLoading = useAppStore.useSetLoading();
  const isLoading = useAppStore.useIsLoading();

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % homepageBanners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-80px)] relative py-10">
      {homepageBanners.map((banner, index) => (
        <div
          key={banner.img}
          className={clsxm(
            "absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-700 ease-in-out -z-10",
            index === bannerIndex ? "opacity-1" : ""
          )}
        >
          <img
            src={getImage(banner.img)}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="container h-full flex flex-col gap-8 justify-between">
        <div>
          <h1 className="h1 text-white">
            {homepageBanners[bannerIndex].title}
          </h1>
          <p className="text-white lg:max-w-[50%]  mt-2 bg-black/20 p-5 rounded-xl">
            {homepageBanners[bannerIndex].desc}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Link to={"/article"} className="btn btn-lg btn-primary rounded-full">
            Explore More
          </Link>
          <button
            onClick={() => setLoading(!isLoading)}
            className="btn btn-lg btn-outline-primary rounded-full"
          >
            Test Loading
          </button>
          <button
            onClick={() => showToast("HAI", DANGER_TOAST)}
            className="btn btn-lg btn-outline-primary rounded-full"
          >
            Toast
          </button>
        </div>
      </div>
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-dark-primary/90 via-transparent to-dark-primary"></div>
    </div>
  );
};

export default HomeBanner;
