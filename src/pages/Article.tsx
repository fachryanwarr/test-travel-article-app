import { useEffect, useState } from "react";
import { FaPlus, FaRegPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import Divider from "../components/Elements/Divider";
import ArticleCard from "../components/Fragments/ArticleCard";
import ArticleSkeleton from "../components/Fragments/ArticleSkeleton";
import PaginationControl from "../components/Fragments/Pagination";
import sendRequest from "../lib/getApi";
import useAppStore from "../store/useAppStore";
import {
  Article,
  ArticleResponse,
  Pagination,
} from "../types/response/article";

const ArticlePage = () => {
  const [articles, setArticles] = useState<Article[]>();
  const [meta, setMeta] = useState<Pagination>();
  const setLoading = useAppStore.useSetLoading();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const isAuth = useAppStore.useIsAuthenticated();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ArticleResponse>(
        "GET",
        "/articles?populate[category]=*"
      );

      if (isSuccess && data) {
        setArticles(data.data);
        setMeta(data.meta.pagination);
      }

      setLoading(false);
    };

    fetchArticles();
  }, [setLoading, pageNumber]);

  return (
    <main className="container py-10">
      <div>
        <div className="flex items-center justify-between gap-5">
          <h3 className="h3 text-white font-bold">
            Article <FaRegPaperPlane className="inline ml-2 text-primary-300" />
          </h3>
          {isAuth && (
            <Link
              to={"/article/add"}
              className="btn btn-md rounded-full btn-outline-primary"
            >
              Add Article
              <FaPlus />
            </Link>
          )}
        </div>
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
          {meta && articles && (
            <div className="w-fit self-end">
              <PaginationControl
                pageNumber={meta.page}
                lastPage={meta.pageCount}
                total={meta.total}
                setPageNumber={setPageNumber}
                showing={articles.length}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ArticlePage;
