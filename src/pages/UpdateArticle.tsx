import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Divider from "../components/Elements/Divider";
import Input from "../components/Elements/Input";
import LoadingButton from "../components/Elements/LoadingButton";
import SelectInput from "../components/Elements/SelectInput";
import TextArea from "../components/Elements/Textarea";
import withAuth from "../components/hoc/WithAuth";
import clsxm from "../lib/clsxm";
import sendRequest from "../lib/getApi";
import { getImage } from "../lib/getImage";
import { showToast, SUCCESS_TOAST } from "../lib/toast";
import useAppStore from "../store/useAppStore";
import { ArticleForm } from "../types/request/formArticle";
import {
  Article,
  ArticleDetailResponse,
  Category,
} from "../types/response/article";
import { ApiResponse } from "../types/response/response";

const UpdateArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article>();

  const setLoading = useAppStore.useSetLoading();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [isImageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ArticleDetailResponse>(
        "GET",
        `/articles/${id}?populate[category]=*`
      );

      if (isSuccess && data) {
        setArticle(data.data);
      }

      setLoading(false);
    };

    fetchArticle();
  }, [id, setLoading]);

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

  const methods = useForm<ArticleForm>({
    mode: "onTouched",
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ArticleForm> = async (formData) => {
    const updateArticle = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ApiResponse<Comment>>(
        "PUT",
        `/articles/${id}`,
        {
          data: formData,
        }
      );

      setLoading(false);
      if (isSuccess && data) {
        showToast("Berhasil memperbarui artikel", SUCCESS_TOAST);
        navigate("/article/" + id);
      }
    };

    updateArticle();
  };

  useEffect(() => {
    if (article) {
      methods.setValue("cover_image_url", article.cover_image_url);
      methods.setValue("title", article.title);
      methods.setValue("description", article.description);
      setImageUrl(article.cover_image_url);

      if (article.category) {
        methods.setValue("category", article.category.id);
      }
    }
  }, [article, methods]);

  return (
    <main className="container py-5 md:py-10">
      <div className="flex items-center justify-between gap-5">
        <h1 className="h3 font-bold text-white">Update Article</h1>
      </div>
      <Divider className="mt-4" />
      {article && (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-4 md:w-[60%]"
          >
            <SelectInput
              label="Category"
              id="category"
              placeholder="Choose Category"
              validation={{ required: "Kategori Wajib diisi" }}
            >
              {categories &&
                categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    className="bg-[#262626] text-white hover:bg-[#404040]"
                  >
                    {cat.name}
                  </option>
                ))}
            </SelectInput>

            <Input
              id="cover_image_url"
              label="Cover Image URL"
              validation={{ required: "Image Wajib diisi" }}
              placeholder="Masukkan URL Image"
              className="rounded-lg"
              onChange={(event) => {
                setImageUrl(event.target.value);
                setImageError(false);
              }}
            />

            <div
              className={clsxm(
                "w-full h-80 rounded-lg overflow-hidden text-white relative p-5 flex items-center justify-center",
                !imageUrl && "border border-white"
              )}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={imageUrl}
                  className="absolute w-full h-full object-cover top-0 left-0 -z-10"
                  onError={() => {
                    setImageError(true);
                    setImageUrl(getImage("datacakra-banner1.jpg"));
                  }}
                />
              ) : (
                <p className="text-center etxt-bw-100">
                  <span>Masukkan Image URL untuk melihat display</span>
                </p>
              )}
              {isImageError && (
                <div className="absolute top-0 left-0 h-full w-full bg-dark-primary bg-opacity-80 flex items-center justify-center">
                  <p className="h6 text-red-400 font-medium">Image Invalid</p>
                </div>
              )}
            </div>

            <Input
              id="title"
              label="Title"
              validation={{ required: "Judul Wajib diisi" }}
              placeholder="Masukkan judul artikel"
              className="rounded-lg"
            />

            <TextArea
              id="description"
              label="Description"
              validation={{ required: "Deskripsi Wajib diisi" }}
              placeholder="Masukkan deskripsi artikel"
              maxLength={500}
            />

            <div className="flex items-center gap-4">
              <Link
                to={`/article/${article?.documentId}`}
                className="btn btn-md btn-outline-primary rounded-full min-w-32"
              >
                Cancel
              </Link>
              <LoadingButton
                type="submit"
                size="md"
                variant="primary"
                className="rounded-full min-w-32"
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      )}
    </main>
  );
};

export default withAuth(UpdateArticlePage, true);
