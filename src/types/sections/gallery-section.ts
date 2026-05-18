import type { ActionResponse, DataResponse } from '../response';

export type GalleryItem = {
  img: string;
  caption: string;
};

export type GalleryData = {
  badge: string;
  headline: string;
  headlineHighlight: string;
  items: GalleryItem[];
};

export type GetGalleryResponse = DataResponse<GalleryData | null>;
export type UpdateGalleryResponse = ActionResponse;
