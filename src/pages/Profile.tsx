import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../lib/formater";
import { showToast, SUCCESS_TOAST } from "../lib/toast";
import useAppStore from "../store/useAppStore";

const ProfilePage = () => {
  const user = useAppStore.useUser();
  const logout = useAppStore.useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast("Berhasil logout", SUCCESS_TOAST);
    navigate("/auth/login");
  };

  return (
    <main className="container w-[80%] md:w-[60%] py-20 flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="text-white flex items-center gap-2 font-medium hover:text-primary-300"
      >
        <IoReturnUpBack className="text-xl" />
        Back
      </button>
      {user && (
        <div className="w-full mt-5 rounded-2xl border-2 p-10 border-primary-400">
          <h4 className="h7 font-bold text-bw-100">My Profile</h4>
          <div className="flex flex-col gap-5 mt-2 text-white">
            <div className="border-b border-bw-500 pb-4">
              <p className="h3 font-bold">{user.username}</p>
            </div>
            <div className="border-b border-bw-500 pb-4">
              <p className="p2 font-semibold text-bw-100">Email</p>
              <p>{user.email}</p>
            </div>
            <div className="border-b border-bw-500 pb-4">
              <p className="p2 font-semibold text-bw-100">Registered at</p>
              <p>{formatDate(user.createdAt)}</p>
            </div>
            <div className="border-b border-bw-500 pb-4">
              <p className="p2 font-semibold text-bw-100">Last Updated at</p>
              <p>{formatDate(user.updatedAt)}</p>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="btn btn-lg btn-primary w-fit rounded-full mt-4 self-end"
      >
        Sign Out
      </button>
    </main>
  );
};

export default ProfilePage;
