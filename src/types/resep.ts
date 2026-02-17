import type { TbResep } from '@prisma/client';
import type { PaginatedResponse, ActionResponse } from './response';

export type ResepData = TbResep;

export type GetAllResepResponse = PaginatedResponse<ResepData>;

export type DeleteResepResponse = ActionResponse;
