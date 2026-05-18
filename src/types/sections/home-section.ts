import type { ActionResponse, DataResponse } from '../response';

export type HeroData = {
  headline: string;
  subtitle: string;
  bgImage: string;
};

export type GetHeroResponse = DataResponse<HeroData | null>;

export type UpdateHeroResponse = ActionResponse;
