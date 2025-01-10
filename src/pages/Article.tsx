import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import Divider from "../components/Elements/Divider";
import ArticleCard from "../components/Fragments/ArticleCard";
import ArticleSkeleton from "../components/Fragments/ArticleSkeleton";
import api from "../lib/api";
import { Article } from "../types/article";

const ArticlePage = () => {
  const [articles, setArticles] = useState<Article[]>();

  const fetchData = async () => {
    try {
      const response = await api.get("/articles");
      const data = response.data.data as Article[];
      setArticles(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  return (
    <main className="container py-10">
      <div className="">
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
