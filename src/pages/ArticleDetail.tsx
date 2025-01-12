import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { IoReturnUpBack } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import Divider from "../components/Elements/Divider";
import Input from "../components/Elements/Input";
import ArticleDetailSkeleton from "../components/Fragments/ArticleDetailSekeleton";
import CommentCard from "../components/Fragments/CommentCard";
import DeleteArticleModal from "../components/Fragments/DeleteArticleModal";
import withAuth from "../components/hoc/WithAuth";
import ModalLayout from "../components/Layout/ModalLayout";
import { formatDate } from "../lib/formater";
import sendRequest from "../lib/getApi";
import { getImage } from "../lib/getImage";
import { showToast, SUCCESS_TOAST } from "../lib/toast";
import useAppStore from "../store/useAppStore";
import { Article, ArticleDetailResponse } from "../types/response/article";
import { ApiResponse } from "../types/response/response";

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article>();
  const setLoading = useAppStore.useSetLoading();
  const user = useAppStore.useUser();

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const fetchArticle = async () => {
    setLoading(true);
    const { isSuccess, data } = await sendRequest<ArticleDetailResponse>(
      "GET",
      `/articles/${id}`,
      null,
      {
        "populate[comments][populate][user]": "*",
        "populate[user]": "*",
      }
    );

    if (isSuccess && data) {
      setArticle(data.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchArticle();
  }, [trigger]);

  const methods = useForm<{ content: string }>({
    mode: "onTouched",
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<{ content: string }> = async (formData) => {
    const postData = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ApiResponse<Comment>>(
        "POST",
        "/comments",
        {
          data: {
            content: formData.content,
            article: article?.id,
          },
        }
      );

      setLoading(false);
      if (isSuccess && data) {
        showToast("Komentar ditambahkan", SUCCESS_TOAST);
        setShowCommentModal(false);
        methods.reset();
        fetchArticle();
      }
    };

    postData();
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = getImage("datacakra-banner1.jpg");
  };

  return (
    <main className="container py-5 md:py-10">
      <div>
        <Link
          to={"/article"}
          className="text-bw-100 hover:text-bw-50 flex items-center gap-2 font-medium"
        >
          <IoReturnUpBack className="text-xl" />
          Back
        </Link>
        {article ? (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="h3 font-bold text-white">{article?.title}</h3>
              {user && user.username === article.user.username && (
                <div className="max-md:w-full max-md:justify-center flex items-center gap-4">
                  <Link
                    to={`/article/${id}/update`}
                    className="btn btn-md btn-secondary rounded-full"
                  >
                    <LuPencilLine />
                    Edit Article
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="btn btn-md btn-outline-primary rounded-full"
                  >
                    <FaRegTrashCan />
                    Delete Article
                  </button>
                </div>
              )}
            </div>
            <Divider className="mt-4 bg-bw-100" />
            <section className="grid md:grid-cols-5 mt-5 gap-10 md:gap-6">
              <div className="md:col-span-3 flex flex-col gap-5">
                <p className="p3 text-bw-50">
                  Published at {formatDate(article.publishedAt)}, by{" "}
                  <b>{article.user.username}</b>
                </p>
                <img
                  src={article?.cover_image_url}
                  alt={article?.title}
                  className="h-72 w-full rounded-lg overflow-hidden object-cover outline-none border-none"
                  onError={handleImageError}
                />
                <p className="p1 text-bw-50 w-full">{article?.description}</p>
              </div>

              <div className="md:col-span-2 md:px-5 max-md:w-full">
                <div className="flex items-center md:justify-between gap-4">
                  <h6 className="h5 text-bw-100">Comments</h6>
                  <button
                    onClick={() => setShowCommentModal(true)}
                    className="btn btn-icon btn-outline-primary aspect-square rounded-full"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex flex-col gap-4 mt-6 p-4 rounded-xl border border-bw-500">
                  {article.comments.length > 0 ? (
                    article.comments.map((comment) => (
                      <CommentCard
                        key={comment.id}
                        comment={comment}
                        setTrigger={setTrigger}
                        trigger={trigger}
                      />
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
      {showCommentModal && (
        <ModalLayout setShowModal={setShowCommentModal}>
          <h6 className="h6 text-bw-700 font-bold">Add Comment</h6>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 mt-4"
            >
              <Input
                id="content"
                validation={{ required: "Wajib diisi" }}
                placeholder="Masukkan komentar Anda"
                light
              />

              <div className="flex items-center gap-2 md:gap-4 md:w-fit max-md:justify-center md:self-end">
                <button
                  type="button"
                  onClick={() => setShowCommentModal(false)}
                  className="btn btn-md btn-outline-secondary rounded-full w-fit min-w-32"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-md btn-primary rounded-full w-fit min-w-32"
                >
                  Submit
                </button>
              </div>
            </form>
          </FormProvider>
        </ModalLayout>
      )}
      {id && showDeleteModal && (
        <DeleteArticleModal documentId={id} setShowModal={setShowDeleteModal} />
      )}
    </main>
  );
};

export default withAuth(ArticleDetailPage, true);
