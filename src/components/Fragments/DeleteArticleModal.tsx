import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import sendRequest from "../../lib/getApi";
import { showToast, SUCCESS_TOAST } from "../../lib/toast";
import useAppStore from "../../store/useAppStore";
import { ApiResponse } from "../../types/response/response";
import ModalLayout from "../Layout/ModalLayout";

const DeleteArticleModal = ({
  documentId,
  setShowModal,
}: {
  documentId: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const setLoading = useAppStore.useSetLoading();
  const navigate = useNavigate();

  const deleteArtikel = async () => {
    setLoading(true);
    const { isSuccess } = await sendRequest<ApiResponse<null>>(
      "DELETE",
      `/articles/${documentId}`
    );

    setLoading(false);
    if (isSuccess) {
      showToast("Artikel dihapus", SUCCESS_TOAST);
      setShowModal(false);
      navigate("/article");
    }
  };

  return (
    <ModalLayout setShowModal={setShowModal}>
      <h6 className="h6 text-bw-700 font-bold text-center">
        Yakin ingin menghapus artikel ini?
      </h6>
      <div className="flex items-center gap-2 md:gap-4 justify-center mt-5">
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
          onClick={deleteArtikel}
          className="btn btn-md btn-primary rounded-full min-w-32"
        >
          Yes
        </button>
      </div>
    </ModalLayout>
  );
};

export default DeleteArticleModal;
