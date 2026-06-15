import type { TbWallet, WalletType } from '@prisma/client';
import type { BaseResponse, PaginationData } from './response';

export type WalletFormData = {
  name: string;
  type: WalletType;
  balance?: number;
};

export interface WalletWithBalance extends TbWallet {
  totalBalance: number;
}

export interface GetAllWalletResponse extends BaseResponse {
  data: WalletWithBalance[];
  pagination: PaginationData;
}

export interface GetWalletByIdResponse extends BaseResponse {
  data: TbWallet;
}
