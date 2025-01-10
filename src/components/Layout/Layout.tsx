import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import useAppStore from "../../store/useAppStore";
import LoadingBar from "../Elements/LoadingBar";
import Toast from "../Elements/Toast";

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
      <Toast />
    </main>
  );
};

export default Layout;
