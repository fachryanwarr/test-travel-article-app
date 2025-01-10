import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import clsxm from "../../lib/clsxm";
import Logo from "../Elements/Logo";

const Header = () => {
  const [showGuestMenu, setShowGuestMenu] = useState(false);

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
            >
              <div
                className={clsxm(
                  "bg-black btn outline outline-2 outline-primary-500 rounded-full py-1 px-2 text-2xl text-gray-200",
                  showGuestMenu && "bg-primary-700/40"
                )}
              >
                <RxHamburgerMenu />
                <FaUserCircle />
              </div>
              {showGuestMenu && (
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
