import type { ActionResponse, DataResponse } from '../response';

export type LegalDoc = {
  title: string;
  sub: string;
  detail: string;
  issued: string;
  variant: 'primary' | 'secondary';
  image: string;
};

export type LegalData = {
  badge: string;
  headline: string;
  headlineHighlight: string;
  description: string;
  docs: LegalDoc[];
};

export type GetLegalResponse = DataResponse<LegalData | null>;
export type UpdateLegalResponse = ActionResponse;
