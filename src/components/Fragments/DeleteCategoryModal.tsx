import { Dispatch, SetStateAction } from "react";
import sendRequest from "../../lib/getApi";
import { showToast, SUCCESS_TOAST } from "../../lib/toast";
import useAppStore from "../../store/useAppStore";
import { Category } from "../../types/response/article";
import { ApiResponse } from "../../types/response/response";
import ModalLayout from "../Layout/ModalLayout";

const DeleteCategoryModal = ({
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

  const deleteCategory = async () => {
    setLoading(true);
    const { isSuccess } = await sendRequest<ApiResponse<null>>(
      "DELETE",
      `/categories/${cat.documentId}`
    );

    setLoading(false);
    if (isSuccess) {
      showToast("Berhasil menghapus kategori", SUCCESS_TOAST);
      setShowModal(false);
      setTrigger(!trigger);
    }
  };

  return (
    <ModalLayout setShowModal={setShowModal}>
      <div className="flex flex-col gap-5">
        <h6 className="h6 text-bw-700 font-bold text-center">
          Yakin menghapus kategori {cat.name}?
        </h6>
        <div className="flex items-center gap-2 md:gap-4 justify-center">
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
            onClick={deleteCategory}
            className="btn btn-md btn-primary rounded-full min-w-32"
          >
            Yes
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DeleteCategoryModal;
