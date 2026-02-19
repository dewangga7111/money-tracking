'use client';

import { useState, useEffect } from 'react';
import Datatable from '@/components/table/datatable';
import { TableColumnType, TableRowType, PaginationInfo } from '@/types/table';
import ResepHistoryRenderCell from './resep-history-render-cell';
import DynamicFilter from '@/components/table/dynamic-filter';
import { FilterField } from '@/types/filter';
import type { ResepHistoryData, GetAllResepHistoryResponse } from '@/types/resep-history';

const columns: TableColumnType[] = [
  { key: 'resepName', label: 'Recipe Name', align: 'start' },
  { key: 'bahanDeductions', label: 'Ingredients Deducted', align: 'start' },
  { key: 'executedAt', label: 'Executed At', align: 'center' },
  { key: 'executedBy', label: 'Executed By', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'errorMessage', label: 'Error', align: 'start' },
];

const fields: FilterField[] = [
  { type: "input", key: "resepName", label: "Recipe Name" },
  {
    type: "select",
    key: "status",
    label: "Status",
    options: [
      { value: "success", label: "Success" },
      { value: "failed", label: "Failed" },
    ],
  },
];

type ResepHistoryContentProps = {
  initialData?: ResepHistoryData[];
  initialPagination: PaginationInfo;
  getAllAction: (page: number, pageSize: number, params: any) => Promise<GetAllResepHistoryResponse>;
};

export function ResepHistoryContent({
  initialData = [],
  initialPagination,
  getAllAction,
}: ResepHistoryContentProps) {
  const [page, setPage] = useState(initialPagination.page);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableRowType[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);
  const [filters, setFilters] = useState<any>();

  // Transform database data to table format
  useEffect(() => {
    const transformedData = initialData.map((v) => ({
      key: v.historyId,
      resepName: v.resepName,
      bahanDeductions: v.bahanDeductions,
      executedAt: v.executedAt,
      executedBy: v.executedBy,
      status: v.status,
      errorMessage: v.errorMessage,
    }));
    setData(transformedData);
  }, [initialData]);

  // listener to filter change
  useEffect(() => {
    handlePageChange(1);
  }, [filters]);

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    try {
      const result = await getAllAction(newPage, pagination.pageSize, filters);
      if (result.success) {
        const transformedData = result.data.map((v) => ({
          key: v.historyId,
          resepName: v.resepName,
          bahanDeductions: v.bahanDeductions,
          executedAt: v.executedAt,
          executedBy: v.executedBy,
          status: v.status,
          errorMessage: v.errorMessage,
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
    return <ResepHistoryRenderCell item={row} columnKey={columnKey} />;
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
        hideAddButton={true}
      />
    </div>
  );
}
