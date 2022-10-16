import { Category } from "@prisma/client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AdminLayout, ButtonLink } from "components";
import Link from "next/link";
import { MdAddCircle } from "react-icons/md";
import { defaultDateFormatOptions } from "utils";
import { trpc } from "utils/trpc";

const columnHelper = createColumnHelper<Category>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (props) =>
      props.getValue().toLocaleDateString("en-US", defaultDateFormatOptions),
  }),
];

const Index = () => {
  const { data } = trpc.useQuery(["category.getAll"]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Category</h1>
        <ButtonLink
          href="/admin/categories/create"
          label="Add Category"
          icon={<MdAddCircle size={20} />}
        />
      </div>
      <div className="relative my-10 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-3 px-6">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="space-x-4 py-4 px-6 text-right">
                  <Link
                    href={`/admin/categories/${row.original.slug}/edit`}
                    passHref
                  >
                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Edit
                    </a>
                  </Link>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Index;
