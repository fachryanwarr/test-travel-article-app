import { useEffect, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../components/Elements/Divider";
import ArticleDetailSkeleton from "../components/Fragments/ArticleDetailSekeleton";
import withAuth from "../components/hoc/WithAuth";
import { formatDate } from "../lib/formater";
import sendRequest from "../lib/getApi";
import { getImage } from "../lib/getImage";
import useAppStore from "../store/useAppStore";
import { Article, ArticleDetailResponse } from "../types/response/article";

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article>();
  const navigate = useNavigate();
  const setLoading = useAppStore.useSetLoading();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ArticleDetailResponse>(
        "GET",
        `/articles/${id}?populate[comments]=*`
      );

      if (isSuccess && data) {
        setArticle(data.data);
      }

      setLoading(false);
    };

    fetchArticles();
  }, [setLoading, id]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = getImage("datacakra-banner1.jpg");
  };

  return (
    <main className="container py-10">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-bw-100 hover:text-bw-50 flex items-center gap-2 font-medium"
        >
          <IoReturnUpBack className="text-xl" />
          Back
        </button>
        {article ? (
          <>
            <h1 className="h1 text-white">{article?.title}</h1>
            <Divider className="mt-4 bg-bw-100" />
            <section className="md:grid md:grid-cols-5 mt-5 gap-6">
              <div className="md:col-span-3 flex flex-col gap-5">
                <img
                  src={article?.cover_image_url}
                  alt={article?.title}
                  className="h-72 w-full rounded-lg overflow-hidden object-cover outline-none border-none"
                  onError={handleImageError}
                />
                <p className="p1 text-bw-50 w-full">{article?.description}</p>
              </div>

              <div className="md:col-span-2 md:px-5 max-md:w-full">
                <h6 className="h6 text-bw-100">Comments</h6>
                <div className="flex flex-col gap-4 mt-6 p-4 rounded-xl border border-bw-500">
                  {article.comments.length > 0 ? (
                    article.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="pb-4 border-b border-bw-500 last:border-0 last:pb-0"
                      >
                        <p className="text-bw-50 p3 font-medium">
                          {formatDate(comment.publishedAt)}
                        </p>
                        <p className="text-white">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-bw-100 text-center">
                      Belum ada komentar pada artikel ini.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : (
          <ArticleDetailSkeleton />
        )}
      </div>
    </main>
  );
};

export default withAuth(ArticleDetailPage, true);
