import type { ActionResponse, DataResponse } from '../response';

export type CardInfo = {
  label: string;
  desc: string;
};

export type BenefitData = {
  quote: string;
  quoteDesc: string;
  badge: string;
  headline: string;
  headlineHighlight: string;
  specialtyCards: CardInfo[];
  info: {
    title: string;
    desc: string;
    benefits: string[];
    type: CardInfo[];
  }
};

export type GetBenefitResponse = DataResponse<BenefitData | null>;
export type UpdateBenefitResponse = ActionResponse;
