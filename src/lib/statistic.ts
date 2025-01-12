import { Statistic } from "../types/dashboard";
import { Article } from "../types/response/article";

export const getCommentStats = (articles: Article[]): Statistic[] => {
  return articles
    .map((article) => ({
      label: article.title,
      value: article.comments.length,
    }))
    .sort((a, b) => b.value - a.value);
};

export const getArticleStatsByDate = (articles: Article[]): Statistic[] => {
  const groupedByDate: { [key: string]: number } = {};

  articles.forEach((article) => {
    const publishedDate = article.publishedAt.split("T")[0];

    if (groupedByDate[publishedDate]) {
      groupedByDate[publishedDate] += 1;
    } else {
      groupedByDate[publishedDate] = 1;
    }
  });

  const result: Statistic[] = Object.keys(groupedByDate)
    .map((date) => ({
      label: date,
      value: groupedByDate[date],
    }))
    .sort((a, b) => (a.label > b.label ? 1 : -1));

  return result;
};
