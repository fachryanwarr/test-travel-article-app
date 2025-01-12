export type ArticleResponse = {
  data: Article[];
  meta: {
    pagination: Pagination;
  };
};

export type ArticleDetailResponse = {
  data: Article;
  meta: object;
};

export type Article = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  comments: Comment[];
  category: Category;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Comment = {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  user: {
    username: string;
  };
};

export type Category = {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
};
