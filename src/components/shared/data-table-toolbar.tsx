"use client"

import { Table } from "@tanstack/react-table"
import { X, Plus, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  filterPlaceholder?: string
  onAdd?: () => void
  onExport?: () => void
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchValue,
  onSearchChange,
  filterPlaceholder = "Filter...",
  onAdd,
  onExport,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0 || !!searchValue

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <Input
            placeholder={filterPlaceholder}
            value={
              searchValue !== undefined
                ? searchValue
                : (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              if (onSearchChange) {
                onSearchChange(event.target.value)
              } else {
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              if (onSearchChange) {
                onSearchChange("")
              }
              table.resetColumnFilters()
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {onExport && (
          <Button variant="outline" size="sm" className="h-8" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
        {onAdd && (
          <Button size="sm" className="h-8" onClick={onAdd}>
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
