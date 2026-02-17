export type TableColumnType = {
  key: string;
  label: string;
  align?: 'start' | 'center' | 'end';
  width?: number | string;
};

export type TableRowType = {
  key: string;
  [key: string]: any;
};

export type DynamicTableProps = {
  columns: TableColumnType[];
  rows: TableRowType[];
  emptyContent?: string;
  loading?: boolean;
  className?: string;
  renderCell?: (row: TableRowType, columnKey: string | number) => React.ReactNode;
  page?: number;
  totalPage?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  doAdd?: () => void;
};

export type RenderCellProps = {
  item: TableRowType;
  columnKey: string | number;
};
