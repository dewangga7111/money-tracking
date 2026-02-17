'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'waku';
import Datatable from '@/components/table/datatable';
import { TableColumnType, TableRowType, PaginationInfo } from '@/types/table';
import BahanRenderCell from './bahan-render-cell';
import DynamicFilter from '@/components/table/dynamic-filter';
import { FilterField } from '@/types/filter';
import type { BahanData, GetAllBahanResponse } from '@/types/bahan';
import type { ActionResponse } from '@/types/response';

const columns: TableColumnType[] = [
  { key: 'name', label: 'Nama Bahan', align: 'start' },
  { key: 'jumlah', label: 'Jumlah', align: 'start' },
  { key: 'satuan', label: 'Satuan', align: 'center' },
];

const fields: FilterField[] = [
  { type: "input", key: "name", label: "Nama Resep" },
];

type BahanContentProps = {
  initialData?: BahanData[];
  initialPagination: PaginationInfo;
  deleteAction: (id: string) => Promise<ActionResponse>;
  getAllAction: (page: number, pageSize: number, params: any) => Promise<GetAllBahanResponse>;
};

export function BahanContent({
  initialData = [],
  initialPagination,
  deleteAction,
  getAllAction,
}: BahanContentProps) {
  const router = useRouter();
  const [page, setPage] = useState(initialPagination.page);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableRowType[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);
  const [filters, setFilters] = useState<any>();

  // Transform database data to table format
  useEffect(() => {
    const transformedData = initialData.map((v) => ({
      key: v.bahanId,
      name: v.name,
      jumlah: v.jumlah,
      satuan: v.satuan,
    }));
    setData(transformedData);
  }, [initialData]);

  // listener to filter change
  useEffect(() => {
    handlePageChange(1);
  }, [filters]);

  const handleAdd = () => {
  };

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    try {
      const result = await getAllAction(newPage, pagination.pageSize, filters);
      if (result.success) {
        const transformedData = result.data.map((v) => ({
          key: v.bahanId,
          name: v.name,
          jumlah: v.jumlah,
          satuan: v.satuan,
        }));
        setData(transformedData);
        setPagination(result.pagination);
        setPage(newPage);
      }
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCell = (row: TableRowType, columnKey: string | number) => {
    return <BahanRenderCell item={row} columnKey={columnKey} />;
  };

  return (
    <div className="space-y-4">
      <DynamicFilter
        fields={fields}
        onFilter={(data: any) => {
          setFilters(data);
        }}
        onClear={() => {
          setFilters(undefined);
        }}
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
      />
    </div>
  );
}
