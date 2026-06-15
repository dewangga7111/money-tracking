import type { TbCategory, CategoryType } from '@prisma/client';
import type { BaseResponse, PaginationData } from './response';

export type CategoryFormData = {
  name: string;
  type: CategoryType;
  icon?: string;
};

export interface GetAllCategoryResponse extends BaseResponse {
  data: TbCategory[];
  pagination: PaginationData;
}

export interface GetCategoryByIdResponse extends BaseResponse {
  data: TbCategory;
}
