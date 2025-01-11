import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { formatDate } from "../../lib/formater";
import useAppStore from "../../store/useAppStore";
import { Comment } from "../../types/response/article";

const CommentCard = ({ comment }: { comment: Comment }) => {
  const user = useAppStore.useUser();

  return (
    <div
      key={comment.id}
      className="pb-4 border-b border-bw-500 last:border-0 last:pb-0"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <p className="p1 text-white font-semibold">{comment.user?.username}</p>
          {user && comment.user?.username === user.username && (
            <>
              <button>
                <LuPencilLine className="text-yellow-400" />
              </button>
              <button>
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
    </div>
  );
};

export default CommentCard;
