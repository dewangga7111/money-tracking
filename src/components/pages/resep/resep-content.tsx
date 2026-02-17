'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'waku';
import Datatable from '@/components/table/datatable';
import { TableColumnType, TableRowType, PaginationInfo } from '@/types/table';
import ResepRenderCell from './resep-render-cell';
import DynamicFilter from '@/components/table/dynamic-filter';
import { FilterField } from '@/types/filter';
import type { ResepData, GetAllResepResponse } from '@/types/resep';
import type { ActionResponse } from '@/types/response';

const columns: TableColumnType[] = [
  { key: 'action', label: 'Action', width: 50, align: 'center' },
  { key: 'name', label: 'Nama Resep', align: 'start' },
  { key: 'bahan', label: 'Bahan-bahan', align: 'start' },
  { key: 'status', label: 'Status', align: 'center' },
];

const fields: FilterField[] = [
  { type: "input", key: "name", label: "Nama Resep" },
  { type: "input", key: "bahan", label: "Bahan" },
  {
    type: "autocomplete",
    key: "status",
    label: "Status",
    placeholder: "Select status",
    options: [
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Inactive',
        value: 'inactive',
      },
    ],
  },
  { type: "daterange", key: "createdRange", label: "Tanggal Dibuat" },
];

type ResepContentProps = {
  initialData?: ResepData[];
  initialPagination: PaginationInfo;
  deleteAction: (id: string) => Promise<ActionResponse>;
  getAllAction: (page: number, pageSize: number) => Promise<GetAllResepResponse>;
};

export function ResepContent({
  initialData = [],
  initialPagination,
  deleteAction,
  getAllAction,
}: ResepContentProps) {
  const router = useRouter();
  const [page, setPage] = useState(initialPagination.page);
  const [loading, setLoading] = useState(false);
  const [resepData, setResepData] = useState<TableRowType[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);

  // Transform database data to table format
  useEffect(() => {
    const transformedData = initialData.map((resep) => ({
      key: resep.resepId,
      name: resep.name,
      bahan: resep.bahan,
      status: resep.status ? 'Active' : 'Inactive',
    }));
    setResepData(transformedData);
  }, [initialData]);

  const handleAdd = () => {
    router.push('/resep/add');
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const result = await deleteAction(id);

      if (result.success) {
        // Refresh current page data
        const pageResult = await getAllAction(page, pagination.pageSize);
        if (pageResult.success) {
          const transformedData = pageResult.data.map((resep) => ({
            key: resep.resepId,
            name: resep.name,
            bahan: resep.bahan,
            status: resep.status ? 'Active' : 'Inactive',
          }));
          setResepData(transformedData);
          setPagination(pageResult.pagination);
        }
      }
    } catch (error) {
      console.error('Error deleting resep:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    try {
      const result = await getAllAction(newPage, pagination.pageSize);
      if (result.success) {
        const transformedData = result.data.map((resep) => ({
          key: resep.resepId,
          name: resep.name,
          bahan: resep.bahan,
          status: resep.status ? 'Active' : 'Inactive',
        }));
        setResepData(transformedData);
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
    return <ResepRenderCell item={row} columnKey={columnKey} onDelete={handleDelete} />;
  };

  return (
    <div className="space-y-4">
      <DynamicFilter
        fields={fields}
        onFilter={(data: any) => {
        }}
        onClear={() => {
        }}
      />

      <Datatable
        columns={columns}
        rows={resepData}
        loading={loading}
        page={page}
        totalPage={pagination.totalPages}
        totalRows={pagination.totalCount}
        onPageChange={handlePageChange}
        doAdd={handleAdd}
        renderCell={renderCell}
      />
    </div>
  );
}
