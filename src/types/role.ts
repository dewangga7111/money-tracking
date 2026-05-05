import type { TbRole } from '@prisma/client';
import type { PaginatedResponse, DataResponse } from './response';

export type RoleData = TbRole;

export type RoleFormData = {
  name: string;
  description?: string;
};

export type GetAllRoleResponse = PaginatedResponse<RoleData>;

export type GetRoleByIdResponse = DataResponse<RoleData>;
