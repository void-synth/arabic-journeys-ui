import { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({ columns, data, onRowClick, emptyMessage = "No data found" }: DataTableProps<T>) {
  return (
    <div className="data-table rounded-xl border border-border bg-card shadow-[0_1px_2px_hsl(var(--shadow-soft)/0.05)]">
      <table className="min-w-[560px] w-full text-sm md:min-w-[640px]">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {columns.map((col, i) => (
              <th key={i} className={`px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground md:px-4 md:py-3.5 ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-12 text-center text-muted-foreground md:px-4 md:py-14">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-border last:border-0 transition-colors hover:bg-muted/25 ${onRowClick ? "cursor-pointer" : ""}`}
              >
                {columns.map((col, i) => (
                  <td key={i} className={`px-3 py-3 align-middle md:px-4 md:py-3.5 ${col.className || ""}`}>
                    {typeof col.accessor === "function" ? col.accessor(row) : (row[col.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
