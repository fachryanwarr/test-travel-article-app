import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import useAppStore from "../../store/useAppStore";
import LoadingBar from "../Elements/LoadingBar";

const Layout = () => {
  const isLoading = useAppStore.useIsLoading()

  return (
    <main>
      <Header />
      {isLoading && <LoadingBar />}
      <section className="min-h-[calc(100vh-80px)] ">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default Layout;
