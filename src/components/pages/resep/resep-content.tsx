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
  { key: 'name', label: 'Name', align: 'start' },
  { key: 'email', label: 'Email', align: 'start' },
  { key: 'role', label: 'Role', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
];

const sampleData: TableRowType[] = [
  {
    key: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    key: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'Inactive',
  },
  {
    key: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    key: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'Active',
  },
];

const fields: FilterField[] = [
  { type: "input", key: "name", label: "Name" },
  {
    type: "autocomplete",
    key: "role",
    label: "Role",
    placeholder: "Select role",
    options: [
      {
        label: 'Admin',
        value: 'admin',
      },
      {
        label: 'User',
        value: 'user',
      },
    ],
  },
  { type: "datepicker", key: "joinedAt", label: "Joined Date" },
  { type: "daterange", key: "activeRange", label: "Active Range" },
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
