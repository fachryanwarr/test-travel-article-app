import { useEffect, useState } from "react";
import { FaPlus, FaRegPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import Divider from "../components/Elements/Divider";
import ArticleCard from "../components/Fragments/ArticleCard";
import ArticleSkeleton from "../components/Fragments/ArticleSkeleton";
import Filter from "../components/Fragments/Filter";
import PaginationControl from "../components/Fragments/Pagination";
import sendRequest from "../lib/getApi";
import useAppStore from "../store/useAppStore";
import {
  Article,
  ArticleResponse,
  Category,
  Pagination,
} from "../types/response/article";
import { ApiResponse } from "../types/response/response";

const ArticlePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>();
  const [meta, setMeta] = useState<Pagination>();
  const setLoading = useAppStore.useSetLoading();
  const isAuth = useAppStore.useIsAuthenticated();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [keyword, setKeyword] = useState("");
  const [selectedCat, setSelectedCat] = useState<Category>();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ArticleResponse>(
        "GET",
        `/articles`,
        null,
        {
          "populate[category]": "*",
          "pagination[pageSize]": 10,
          "pagination[page]": pageNumber,
          "sort[0]": "publishedAt:desc",
          "filters[title][$containsi]": keyword,
          "filters[category][name][$eqi]": selectedCat?.name || "",
        }
      );

      if (isSuccess && data) {
        setArticles(data.data);
        setMeta(data.meta.pagination);
      }

      setLoading(false);
    };

    fetchArticles();
  }, [setLoading, pageNumber, keyword, selectedCat]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ApiResponse<Category[]>>(
        "GET",
        "/categories"
      );

      if (isSuccess && data) {
        setCategories(data.data);
      }

      setLoading(false);
    };

    getCategories();
  }, [setLoading]);

  useEffect(() => {
    setPageNumber(0);
  }, [keyword, selectedCat]);

  return (
    <main className="container py-5 md:py-10">
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
      <section className="md:grid md:grid-cols-5 py-10 gap-5">
        <Filter
          categories={categories}
          setKeyword={setKeyword}
          setSelectedCat={setSelectedCat}
          selectedCat={selectedCat}
          keyword={keyword}
        />
        <div className="md:col-span-4 flex flex-col gap-5">
          {articles ? (
            articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <div className="w-full flex items-center justify-center border p-5 text-white text-center rounded-xl min-h-56">
                Tidak ada data artikel terkait
              </div>
            )
          ) : (
            Array.from({ length: 5 }, (_, i) => <ArticleSkeleton key={i} />)
          )}
          {meta && articles && (
            <div className="w-fit self-center md:self-end">
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
