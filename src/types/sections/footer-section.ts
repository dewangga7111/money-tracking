import type { ActionResponse, DataResponse } from '../response';

export type FooterSocial = {
  label: string;
  href: string;
};

export type FooterProductLink = {
  label: string;
  href: string;
};

export type FooterData = {
  contact: {
    headline: string;
    subheadline: string;
  };
  brand: {
    name: string;
    sub: string;
  };
  address: string;
  phone: string;
  email: string;
  socials: FooterSocial[];
  products: FooterProductLink[];
  copyright: string;
  youtubeHandle: string;
  instagramHandle: string;
};

export type GetFooterResponse = DataResponse<FooterData | null>;
export type UpdateFooterResponse = ActionResponse;
