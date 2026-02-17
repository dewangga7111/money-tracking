import type { PaginationInfo } from './table';

export type BaseResponse = {
  success: boolean;
  error?: string;
};

export type DataResponse<T> = BaseResponse & {
  data: T;
};

export type PaginatedResponse<T> = BaseResponse & {
  data: T[];
  pagination: PaginationInfo;
};

export type ActionResponse = BaseResponse & {
  message?: string;
};
