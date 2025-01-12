import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SmallArticleCard from "../components/Fragments/SmallArticleCard";
import { formatDate } from "../lib/formater";
import sendRequest from "../lib/getApi";
import { showToast, SUCCESS_TOAST } from "../lib/toast";
import useAppStore from "../store/useAppStore";
import { Article, Comment } from "../types/response/article";
import { ApiResponse } from "../types/response/response";

export function getUniqueArticlesFromComments(comments: Comment[]): Article[] {
  const uniqueArticlesMap: Record<string, Article> = {};

  comments.forEach((comment) => {
    if (comment.article) {
      if (!uniqueArticlesMap[comment.article.documentId]) {
        uniqueArticlesMap[comment.article.documentId] = comment.article;
      }
    }
  });

  return Object.values(uniqueArticlesMap);
}

const ProfilePage = () => {
  const user = useAppStore.useUser();
  const logout = useAppStore.useLogout();
  const navigate = useNavigate();

  const [comments, setComments] = useState<Comment[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  const handleLogout = () => {
    logout();
    showToast("Berhasil logout", SUCCESS_TOAST);
    navigate("/auth/login");
  };

  useEffect(() => {
    const fetchComments = async () => {
      const { isSuccess, data } = await sendRequest<ApiResponse<Comment[]>>(
        "GET",
        `/comments`,
        null,
        {
          "sort[0]": "publishedAt:desc",
          "filters[user][username]": user?.username || "",
          "populate[article]": "*",
        }
      );

      if (isSuccess && data) {
        setComments(data.data);
      }
    };

    if (user) {
      fetchComments();
    }
  }, [user]);

  useEffect(() => {
    if (comments) {
      setArticles(getUniqueArticlesFromComments(comments));
    }
  }, [comments]);

  return (
    <main className="container w-[80%] py-20 flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="text-white flex items-center gap-2 font-medium hover:text-primary-300"
      >
        <IoReturnUpBack className="text-xl" />
        Back
      </button>
      {user && (
        <div className="w-full mt-5 grid md:grid-cols-4 gap-6">
          <div className="md:col-span-3 border-2 p-10 border-primary-400 rounded-2xl">
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
          <div className="w-full">
            <h5 className="h5 font-bold text-white">Destinasi Dikomentari</h5>
            <div className="rounded-2xl border border-white p-5 pr-2 mt-5">
              <div className="styled-scrollbar max-h-[60vh] overflow-y-auto pr-3">
                {articles && articles.length > 0 ? (
                  articles.map((article) => (
                    <SmallArticleCard key={article.id} article={article} />
                  ))
                ) : (
                  <div className="text-center text-white">
                    Belum ada komentar
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="btn btn-lg btn-primary w-fit mt-4 self-end"
      >
        Sign Out
        <IoIosLogOut />
      </button>
    </main>
  );
};

export default ProfilePage;
