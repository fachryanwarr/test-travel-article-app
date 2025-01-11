import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { formatDate } from "../../lib/formater";
import sendRequest from "../../lib/getApi";
import { showToast, SUCCESS_TOAST } from "../../lib/toast";
import useAppStore from "../../store/useAppStore";
import { Comment } from "../../types/response/article";
import { ApiResponse } from "../../types/response/response";
import Input from "../Elements/Input";
import ModalLayout from "../Layout/ModalLayout";

const CommentCard = ({
  comment,
  setTrigger,
  trigger,
}: {
  comment: Comment;
  setTrigger?: Dispatch<SetStateAction<boolean>>;
  trigger?: boolean;
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>();
  const user = useAppStore.useUser();
  const setLoading = useAppStore.useSetLoading();

  const methods = useForm<{ content: string }>({
    mode: "onTouched",
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<{ content: string }> = async (formData) => {
    const updateComment = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ApiResponse<Comment>>(
        "PUT",
        `/comments/${selectedComment?.documentId}`,
        {
          data: {
            content: formData.content,
          },
        }
      );

      setLoading(false);
      if (isSuccess && data) {
        showToast("Komentar diperbarui", SUCCESS_TOAST);
        setShowUpdateModal(false);
        methods.reset();

        if (setTrigger) {
          setTrigger(!trigger);
        }
      }
    };

    updateComment();
  };

  const deleteComment = async () => {
    setLoading(true);
    const { isSuccess } = await sendRequest<ApiResponse<Comment>>(
      "DELETE",
      `/comments/${selectedComment?.documentId}`
    );

    setLoading(false);
    if (isSuccess) {
      showToast("Komentar dihapus", SUCCESS_TOAST);
      setShowDeleteModal(false);

      if (setTrigger) {
        setTrigger(!trigger);
      }
    }
  };

  useEffect(() => {
    if (selectedComment) {
      methods.setValue("content", selectedComment.content);
    }
  }, [selectedComment, methods]);

  return (
    <div
      key={comment.id}
      className="pb-4 border-b border-bw-500 last:border-0 last:pb-0"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <p className="p1 text-white font-semibold">
            {comment.user?.username}
          </p>
          {user && comment.user?.username === user.username && (
            <>
              <button
                onClick={() => {
                  setSelectedComment(comment);
                  setShowUpdateModal(true);
                }}
              >
                <LuPencilLine className="text-yellow-400" />
              </button>
              <button
                onClick={() => {
                  setSelectedComment(comment);
                  setShowDeleteModal(true);
                }}
              >
                <FaRegTrashCan className="text-red-400" />
              </button>
            </>
          )}
        </div>
        <p className="text-bw-50 p3 font-medium">
          {formatDate(comment.publishedAt)}
        </p>
      </div>
      <p className="p2 text-white">{comment.content}</p>

      {showUpdateModal && (
        <ModalLayout setShowModal={setShowUpdateModal}>
          <h6 className="h6 text-bw-700 font-bold">Update Comment</h6>
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
                  onClick={() => {
                    setSelectedComment(null);
                    setShowUpdateModal(false);
                    methods.reset();
                  }}
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

      {showDeleteModal && (
        <ModalLayout
          setShowModal={setShowDeleteModal}
          containerClassName="!md:w-[40%]"
        >
          <h6 className="h6 text-bw-700 font-bold text-center">
            Yakin ingin menghapus komentar ini?
          </h6>
          <div className="flex items-center gap-2 md:gap-4 justify-center mt-5">
            <button
              type="button"
              onClick={() => {
                setSelectedComment(null);
                setShowDeleteModal(false);
              }}
              className="btn btn-md btn-outline-secondary rounded-full min-w-32"
            >
              Cancel
            </button>
            <button
              onClick={deleteComment}
              className="btn btn-md btn-primary rounded-full min-w-32"
            >
              Yes
            </button>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default CommentCard;
