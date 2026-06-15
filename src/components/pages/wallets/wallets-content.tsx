'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'waku';
import { Button } from '@heroui/react';
import { PlusIcon } from 'lucide-react';
import Datatable from '@/components/table/datatable';
import { button } from '@/utils/primitives';
import { TableColumnType, TableRowType, PaginationInfo } from '@/types/table';
import WalletsRenderCell from './wallets-render-cell';
import DynamicFilter from '@/components/table/dynamic-filter';
import { FilterField } from '@/types/filter';
import type { WalletWithBalance, GetAllWalletResponse } from '@/types/wallet';
import type { ActionResponse } from '@/types/response';

const columns: TableColumnType[] = [
  { key: 'action', label: 'Action', width: 50, align: 'center' },
  { key: 'name', label: 'Name', align: 'start' },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'balance', label: 'Balance', align: 'end' },
];

const fields: FilterField[] = [
  { type: 'input', key: 'name', label: 'Wallet Name' },
];

type WalletsContentProps = {
  initialData?: WalletWithBalance[];
  initialPagination: PaginationInfo;
  deleteAction: (id: string) => Promise<ActionResponse>;
  getAllAction: (page: number, pageSize: number, params: any) => Promise<GetAllWalletResponse>;
};

export function WalletsContent({
  initialData = [],
  initialPagination,
  deleteAction,
  getAllAction,
}: WalletsContentProps) {
  const router = useRouter();
  const [page, setPage] = useState(initialPagination.page);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableRowType[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);
  const [filters, setFilters] = useState<any>();

  useEffect(() => {
    setData(
      initialData.map((v) => ({
        key: v.walletId,
        name: v.name,
        type: v.type,
        balance: v.totalBalance,
      }))
    );
  }, [initialData]);

  useEffect(() => {
    handlePageChange(1);
  }, [filters]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const result = await deleteAction(id);
      if (result.success) {
        const pageResult = await getAllAction(page, pagination.pageSize, filters);
        if (pageResult.success) {
          setData(
            pageResult.data.map((v) => ({
              key: v.walletId,
              name: v.name,
              type: v.type,
              balance: v.totalBalance,
            }))
          );
          setPagination(pageResult.pagination);
        }
      }
    } catch (error) {
      console.error('Error deleting wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    try {
      const result = await getAllAction(newPage, pagination.pageSize, filters);
      if (result.success) {
        setData(
          result.data.map((v) => ({
            key: v.walletId,
            name: v.name,
            type: v.type,
            balance: v.totalBalance,
          }))
        );
        setPagination(result.pagination);
        setPage(newPage);
      }
    } catch (error) {
      console.error('Error fetching wallets:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCell = (row: TableRowType, columnKey: string | number) => (
    <WalletsRenderCell item={row} columnKey={columnKey} onDelete={handleDelete} />
  );

  return (
    <div className="space-y-4">
      <DynamicFilter
        fields={fields}
        onFilter={(data: any) => setFilters(data)}
        onClear={() => setFilters(undefined)}
      />
      <Datatable
        columns={columns}
        rows={data}
        loading={loading}
        page={page}
        totalPage={pagination.totalPages}
        totalRows={pagination.totalCount}
        onPageChange={handlePageChange}
        renderCell={renderCell}
        topContent={
          <div className="flex flex-col gap-4">
            <div className="flex justify-end gap-3 items-end">
              <Button onPress={() => router.push('/wallets/add')} variant="primary" className={button()}>
                <span className="flex items-center gap-2"><PlusIcon size={15} />Add</span>
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
