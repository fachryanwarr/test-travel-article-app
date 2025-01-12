import { Dispatch, SetStateAction, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import sendRequest from "../../lib/getApi";
import { showToast, SUCCESS_TOAST } from "../../lib/toast";
import useAppStore from "../../store/useAppStore";
import { Category } from "../../types/response/article";
import { ApiResponse } from "../../types/response/response";
import Input from "../Elements/Input";
import ModalLayout from "../Layout/ModalLayout";

const UpdateCategoryModal = ({
  setShowModal,
  setTrigger,
  trigger,
  cat,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setTrigger: Dispatch<SetStateAction<boolean>>;
  trigger: boolean;
  cat: Category;
}) => {
  const setLoading = useAppStore.useSetLoading();

  const methods = useForm<{ name: string }>({
    mode: "onTouched",
  });

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<{ name: string }> = async (formData) => {
    const addCategory = async () => {
      setLoading(true);
      const { isSuccess } = await sendRequest<ApiResponse<null>>(
        "PUT",
        `/categories/${cat.documentId}`,
        {
          data: {
            name: formData.name,
          },
        }
      );

      setLoading(false);
      if (isSuccess) {
        showToast("Berhasil memperbarui kategori", SUCCESS_TOAST);
        setShowModal(false);
        setTrigger(!trigger);
        methods.reset();
      }
    };

    addCategory();
  };

  useEffect(() => {
    methods.setValue("name", cat.name);
  }, [cat, methods]);

  return (
    <ModalLayout setShowModal={setShowModal}>
      <div className="flex flex-col gap-5">
        <h6 className="h6 text-bw-700 font-bold">Update Category</h6>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Input
              id="name"
              validation={{ required: "Wajib diisi" }}
              placeholder="Masukkan nama kategori"
              className="rounded-lg"
              light
            />
            <div className="flex items-center gap-2 md:gap-4 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                }}
                className="btn btn-md btn-outline-secondary rounded-full min-w-32"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-md btn-primary rounded-full min-w-32"
              >
                Submit
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </ModalLayout>
  );
};

export default UpdateCategoryModal;
