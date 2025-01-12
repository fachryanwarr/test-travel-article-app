import { Link } from "react-router-dom";
import { Article } from "../../types/response/article";

const SmallArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link to={`/article/${article.documentId}`} className="w-full p-4 group">
      <div className="relative w-full h-24 rounded-lg overflow-hidden border border-dark-secondary">
        <img
          src={article.cover_image_url}
          alt={article.title}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 duration-300"
        />
      </div>
      <p className="text-bw-50 font-medium mt-4 pb-3 border-b group-hover:text-white">
        {article.title}
      </p>
    </Link>
  );
};

export default SmallArticleCard;
