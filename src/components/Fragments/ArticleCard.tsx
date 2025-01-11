import { formatDate } from "../../lib/formater";
import { getImage } from "../../lib/getImage";
import { Article } from "../../types/response/article";

const ArticleCard = ({ article }: { article: Article }) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = getImage("datacakra-banner1.jpg");
  };

  return (
    <div className="flex h-56 w-full rounded-xl overflow-hidden p-4 border border-white">
      <div className="h-full rounded-lg w-72 overflow-hidden cursor-pointer relative group">
        <img
          src={article.cover_image_url || getImage("datacakra-banner1.jpg")}
          alt={article.title}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 duration-300"
          onError={handleImageError}
        />
      </div>

      <div className="px-6 flex flex-col gap-2">
        <h6 className="text-bw-50 h4 font-bold">{article.title}</h6>
        <p className="p3 text-bw-200">{formatDate(article.publishedAt)}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
