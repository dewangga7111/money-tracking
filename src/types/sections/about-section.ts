import type { ActionResponse, DataResponse } from '../response';

export type WasteCard = {
  label: string;
  img: string;
};

export type AdabValue = {
  letter: string;
  name: string;
  desc: string;
};

export type AboutData = {
  introduction: {
    headline: string;
    headlineHighlight: string;
    paragraph1: string;
    paragraph2: string;
    callout: string;
    wasteCards: WasteCard[];
  };
  problems: {
    items: string[];
  };
  company: {
    name: string;
    nameHighlight: string;
    paragraph1: string;
    paragraph2: string;
    vision: string;
    missions: string[];
    values: AdabValue[];
  };
};

export type GetAboutResponse = DataResponse<AboutData | null>;
export type UpdateAboutResponse = ActionResponse;
