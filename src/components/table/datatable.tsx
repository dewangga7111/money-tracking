"use client";

import React, { useEffect, useState } from "react";
import { Table, Spinner, Pagination, Card } from "@heroui/react";
import { Inbox } from "lucide-react";
import { DynamicTableProps } from "@/types/table";
import { isMobile } from "react-device-detect";

function generatePages(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export default function Datatable({
  columns,
  rows,
  emptyContent = "No data available",
  loading = true,
  className = "",
  renderCell,
  page = 1,
  totalPage = 0,
  totalRows = 0,
  onPageChange,
  topContent,
}: DynamicTableProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const finalColumns = [
    { key: "no", label: "No", align: "center" as const, width: 50 },
    ...columns,
  ];

  const startRow = totalRows === 0 ? 0 : (page - 1) * 10 + 1;
  const endRow = Math.min(page * 10, totalRows);

  const bottomContent = (
    <Pagination>
      <Pagination.Summary className="max-sm:self-center">
        {totalRows > 0
          ? `Showing ${startRow}–${endRow} of ${totalRows} entries`
          : "No data to display"}
      </Pagination.Summary>
      <Pagination.Content className="max-sm:self-center">
        <Pagination.Item>
          <Pagination.Previous
            onPress={() => onPageChange?.(page - 1)}
            isDisabled={page <= 1}
          >
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>

        {generatePages(page, totalPage).map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`e-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === page}
                onPress={() => onPageChange?.(p)}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          )
        )}

        <Pagination.Item>
          <Pagination.Next
            onPress={() => onPageChange?.(page + 1)}
            isDisabled={page >= totalPage}
          >
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );

  // Mobile card view
  const renderMobileCards = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-40">
          <Spinner size="lg" />
        </div>
      );
    }

    if (!rows || rows.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-400">
          <Inbox className="h-12 w-12 mb-3 text-gray-300 stroke-[1.5]" />
          <p className="text-sm font-medium">{emptyContent}</p>
        </div>
      );
    }

    return (
      <div className="w-full">
        <div className="mb-4">{topContent}</div>
        <div className="flex flex-col gap-3">
          {rows.map((item, index) => {
            const actionColumn = columns.find((col) => col.key === "action");
            return (
              <Card key={item.key || index} className="p-3 shadow-sm">
                <Card.Header>
                  <div className="flex justify-between items-center w-full">
                    <p className="font-semibold text-sm">
                      #{(page - 1) * 10 + (index + 1)}
                    </p>
                    {actionColumn && renderCell && (
                      <div>{renderCell(item, actionColumn.key)}</div>
                    )}
                  </div>
                </Card.Header>
                <Card.Content className="grid grid-cols-1 gap-2 text-sm">
                  {columns
                    .filter((col) => col.key !== "action")
                    .map((col) => (
                      <div key={col.key} className="flex justify-between">
                        <span className="text-default-500 font-medium">{col.label}</span>
                        <span className="text-right">
                          {renderCell
                            ? renderCell(item, col.key)
                            : (item as Record<string, any>)[col.key]}
                        </span>
                      </div>
                    ))}
                </Card.Content>
              </Card>
            );
          })}
        </div>
        <div className="mt-4">{bottomContent}</div>
      </div>
    );
  };

  // Desktop table view
  const renderDesktopTable = () => (
    <Card className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
      <Card.Content className="p-0 sm:p-2 md:p-4">
        {topContent && <div className="mb-4">{topContent}</div>}
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white/60 z-10 rounded">
              <Spinner size="lg" />
            </div>
          )}
          <Table variant="secondary">
            <Table.Content>
              <Table.Header>
                {finalColumns.map((col, i) => (
                  <Table.Column
                    key={col.key}
                    id={col.key}
                    isRowHeader={i === 0}
                    style={{ width: col.width, textAlign: col.align }}
                  >
                    {col.label}
                  </Table.Column>
                ))}
              </Table.Header>

              <Table.Body
                items={rows}
                renderEmptyState={() =>
                  !loading ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                      <Inbox className="h-12 w-12 mb-3 text-gray-200 stroke-[1]" />
                      <p className="text-sm font-medium tracking-wide">{emptyContent}</p>
                    </div>
                  ) : null
                }
              >
                {(item) => {
                  const index = rows.indexOf(item);
                  return (
                    <Table.Row id={String(item.key || index)}>
                      {finalColumns.map((col) => (
                        <Table.Cell key={col.key} style={{ textAlign: col.align }}>
                          {col.key === "no"
                            ? (page - 1) * 10 + (index + 1)
                            : renderCell
                              ? renderCell(item, col.key)
                              : (item as Record<string, any>)[col.key]}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  );
                }}
              </Table.Body>
            </Table.Content>
            <Table.Footer className="pb-0">
              {bottomContent}
            </Table.Footer>
          </Table>
        </div>
      </Card.Content>
    </Card>
  );

  if (!mounted) return null;

  return (
    <div className={className}>
      {isMobile ? renderMobileCards() : renderDesktopTable()}
    </div>
  );
}
