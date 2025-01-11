import { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import Divider from "../components/Elements/Divider";
import ArticleCard from "../components/Fragments/ArticleCard";
import ArticleSkeleton from "../components/Fragments/ArticleSkeleton";
import sendRequest from "../lib/getApi";
import useAppStore from "../store/useAppStore";
import { Article, ArticleResponse } from "../types/response/article";

const ArticlePage = () => {
  const [articles, setArticles] = useState<Article[]>();
  const setLoading = useAppStore.useSetLoading();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ArticleResponse>(
        "GET",
        "/articles"
      );

      if (isSuccess && data) {
        setArticles(data.data);
      }

      setLoading(false);
    };

    fetchArticles();
  }, [setLoading]);

  return (
    <main className="container py-10">
      <div>
        <h1 className="h1 text-white">
          Article <FaRegPaperPlane className="inline ml-2 text-primary-300" />
        </h1>
        <Divider className="mt-4" />
      </div>
      <section className="grid grid-cols-5 py-10 gap-10">
        <div></div>
        <div className="col-span-4 flex flex-col gap-5">
          {articles
            ? articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            : Array.from({ length: 5 }, (_, i) => <ArticleSkeleton key={i} />)}
        </div>
      </section>
    </main>
  );
};

export default ArticlePage;
