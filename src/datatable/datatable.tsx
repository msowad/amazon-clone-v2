import { flexRender, Table } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdAddCircle, MdClose, MdSearch } from "react-icons/md";
import ButtonLink from "../components/button-link";

interface Props<T> {
  title: string;
  search: string;
  isLoading: boolean;
  table: Table<T>;
  orderBy: string;
  sortOrder: "asc" | "desc";
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
  createButtonLink: string;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  onSearch: (q: string) => void;
  onSearchSubmit: () => void;
  onSort: (fieldId: string) => void;
  onDelete: (original: T) => void;
  renderEditUrl: (original: T) => string;
}

const DataTable = <T,>({
  title,
  search,
  isLoading,
  table,
  orderBy,
  sortOrder,
  data,
  page,
  limit,
  totalCount,
  createButtonLink,
  onPageChange,
  onLimitChange,
  onSearch,
  onSearchSubmit,
  onSort,
  onDelete,
  renderEditUrl,
}: Props<T>) => {
  const totalPage = useMemo(
    () => Math.ceil(totalCount / limit),
    [limit, totalCount]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <ButtonLink
          href={createButtonLink}
          label={`Add ${title}`}
          icon={<MdAddCircle size={20} />}
        />
      </div>
      <div className="p-2" />
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit();
        }}
        className="my-2 flex items-center"
      >
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MdSearch size={25} />
          </div>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            type="text"
            className="input-primary !pr-10 !pl-10"
            placeholder="Search"
          />
          <button
            type="button"
            onClick={() => onSearch("")}
            className={`${
              search.length < 1 && "hidden"
            } absolute inset-y-0 right-0 flex items-center pr-2`}
          >
            <MdClose size={20} />
          </button>
        </div>
      </form>
      <div className="p-1" />
      <div className="overflow-auto shadow-md sm:rounded-lg">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <CgSpinner size={35} className="animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-2 px-6">
                      <div className="flex items-center">
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <button
                              onClick={() => onSort(header.column.id)}
                              className={`p-2 ${
                                orderBy === header.column.id
                                  ? "text-gray-200"
                                  : "text-gray-500"
                              }`}
                            >
                              {sortOrder === "desc" &&
                              orderBy === header.column.id ? (
                                <FaArrowDown />
                              ) : (
                                <FaArrowUp />
                              )}
                            </button>
                          )}
                        </>
                      </div>
                    </th>
                  ))}
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900  even:dark:bg-gray-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td className="space-x-4 py-4 px-6 text-right">
                    <Link href={renderEditUrl(row.original)} passHref>
                      <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Edit
                      </a>
                    </Link>
                    <button
                      onClick={() => onDelete(row.original)}
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      {data && (
        <nav
          className="flex flex-col items-center justify-between space-y-4 pt-4 md:flex-row"
          aria-label="Table navigation"
        >
          <div className="flex items-center space-x-4">
            <label htmlFor="select-limit" className="text-sm">
              Rows per page
            </label>
            <select
              value={limit}
              onChange={(e) => onLimitChange(parseInt(e.target.value))}
              name="select-limit"
              className="input-primary"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                <>
                  {data[0] === 0 ? 0 : (page - 1) * limit + 1}-
                  {page * limit > totalCount ? totalCount : page * limit}
                </>
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalCount}
              </span>
            </div>
          </div>
          <ul className="pagination-items inline-flex items-center -space-x-px">
            <li>
              <button
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            <li>
              <button
                disabled={page >= totalPage}
                onClick={() => onPageChange(page + 1)}
                className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default DataTable;
