import type { TbUser, TbRole } from '@prisma/client';
import type { PaginatedResponse, DataResponse } from './response';

export type UserData = TbUser & {
  role: TbRole;
};

export type UserFormData = {
  name: string;
  email: string;
  password?: string;
  roleId: string;
};

export type GetAllUserResponse = PaginatedResponse<UserData>;

export type GetUserByIdResponse = DataResponse<UserData>;
