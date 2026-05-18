import type { ActionResponse, DataResponse } from '../response';

export type HowToCategory = {
  title: string;
  sub: string;
  cls: string;
  items: string[];
};

export type HowToData = {
  badge: string;
  headline: string;
  subheadline: string;
  sprayingTimes: string[];
  categories: HowToCategory[];
  generalNotes: string[];
};

export type GetHowToResponse = DataResponse<HowToData | null>;
export type UpdateHowToResponse = ActionResponse;
