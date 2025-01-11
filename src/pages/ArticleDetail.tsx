import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../components/Elements/Divider";
import Input from "../components/Elements/Input";
import ArticleDetailSkeleton from "../components/Fragments/ArticleDetailSekeleton";
import CommentCard from "../components/Fragments/CommentCard";
import withAuth from "../components/hoc/WithAuth";
import ModalLayout from "../components/Layout/ModalLayout";
import sendRequest from "../lib/getApi";
import { getImage } from "../lib/getImage";
import { DANGER_TOAST, showToast, SUCCESS_TOAST } from "../lib/toast";
import useAppStore from "../store/useAppStore";
import { Article, ArticleDetailResponse } from "../types/response/article";
import { ApiResponse } from "../types/response/response";

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article>();
  const navigate = useNavigate();
  const setLoading = useAppStore.useSetLoading();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const fetchArticle = async () => {
    setLoading(true);
    const { isSuccess, data } = await sendRequest<ArticleDetailResponse>(
      "GET",
      `/articles/${id}?populate[comments][populate][user]=*`
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
      } else {
        showToast("Username atau password salah", DANGER_TOAST);
      }
    };

    postData();
  };

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
                <div className="flex items-center justify-between">
                  <h6 className="h6 text-bw-100">Comments</h6>
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
                      <CommentCard key={comment.id} comment={comment} />
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

              <div className="flex items-center gap-4 w-fit self-end">
                <button
                  type="button"
                  onClick={() => setShowCommentModal(false)}
                  className="btn btn-lg btn-primary rounded-full w-fit min-w-32"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary rounded-full w-fit min-w-32"
                >
                  Submit
                </button>
              </div>
            </form>
          </FormProvider>
        </ModalLayout>
      )}
    </main>
  );
};

export default withAuth(ArticleDetailPage, true);
