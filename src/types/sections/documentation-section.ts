import type { ActionResponse, DataResponse } from '../response';

export type DocumentationArticle = {
  media: string;
  date: string;
  title: string;
  img: string;
  tag: string;
  link: string;
};

export type DocumentationData = {
  badge: string;
  headline: string;
  subheadline: string;
  articles: DocumentationArticle[];
};

export type GetDocumentationResponse = DataResponse<DocumentationData | null>;
export type UpdateDocumentationResponse = ActionResponse;
