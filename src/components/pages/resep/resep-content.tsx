'use client';

import { useState } from 'react';
import { useRouter } from 'waku';
import Datatable from '@/components/table/datatable';
import { TableColumnType, TableRowType } from '@/types/table';
import ResepRenderCell from './resep-render-cell';
import DynamicFilter from '@/components/table/dynamic-filter';
import { FilterField } from '@/types/filter';

const columns: TableColumnType[] = [
  { key: 'action', label: 'Action', width: 50, align: 'center' },
  { key: 'name', label: 'Nama Resep', align: 'start' },
  { key: 'bahan', label: 'Bahan-bahan', align: 'start' },
  { key: 'status', label: 'Status', align: 'center' },
];

const sampleData: TableRowType[] = [
  {
    key: '1',
    name: 'Nasi Goreng',
    bahan: 'Nasi putih, telur, bawang merah, bawang putih, kecap manis',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Rendang Daging',
    bahan: 'Daging sapi, santan, cabai merah, bawang merah, serai',
    status: 'Active',
  },
  {
    key: '3',
    name: 'Soto Ayam',
    bahan: 'Ayam, kunyit, jahe, bawang putih, seledri',
    status: 'Active',
  },
  {
    key: '4',
    name: 'Gado-Gado',
    bahan: 'Sayuran rebus, tahu, tempe, telur, bumbu kacang',
    status: 'Active',
  },
  {
    key: '5',
    name: 'Ayam Bakar',
    bahan: 'Ayam, kecap manis, bawang putih, jahe, lengkuas',
    status: 'Active',
  },
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

export function ResepContent() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    router.push('/resep/add');
  };

  const renderCell = (row: TableRowType, columnKey: string | number) => {
    return <ResepRenderCell item={row} columnKey={columnKey} />;
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
        rows={sampleData}
        loading={loading}
        page={page}
        totalPage={Math.ceil(sampleData.length / 10)}
        totalRows={sampleData.length}
        onPageChange={setPage}
        doAdd={handleAdd}
        renderCell={renderCell}
      />
    </div>
  );
}
