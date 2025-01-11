import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import clsxm from "../../lib/clsxm";
import useAppStore from "../../store/useAppStore";
import Logo from "../Elements/Logo";

const Header = () => {
  const [showGuestMenu, setShowGuestMenu] = useState(false);
  const user = useAppStore.useUser();
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <div className="container flex justify-between relative items-center h-full">
          <Link to={"/"}>
            <Logo />
          </Link>

          <div className="h-full flex items-center gap-5">
            <ul className="menus">
              <Link to={"/article"}>Article</Link>
            </ul>

            <div
              className="h-full flex items-center relative cursor-pointer"
              onMouseEnter={() => setShowGuestMenu(true)}
              onMouseLeave={() => setShowGuestMenu(false)}
              onClick={() => {
                if (user) {
                  navigate("/profile");
                }
              }}
            >
              <div
                className={clsxm(
                  "bg-black btn outline outline-2 outline-primary-500 rounded-full py-1 px-2 text-2xl text-gray-200",
                  showGuestMenu && "bg-primary-700/40"
                )}
              >
                {user ? (
                  <span className="p3 font-medium">{user?.username}</span>
                ) : (
                  <RxHamburgerMenu />
                )}
                <FaUserCircle />
              </div>
              {!user && showGuestMenu && (
                <div className="absolute top-[60px] pt-2 right-0">
                  <div className="dropdown-user">
                    <Link to={"/auth/login"} className="option">
                      Sign In
                    </Link>
                    <Link to={"/auth/register"} className="option">
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
