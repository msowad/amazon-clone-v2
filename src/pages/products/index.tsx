import { Transition } from "@headlessui/react";
import { Breadcrumb, Layout, ProductCard, ProductsFilter } from "components";
import { Fragment, useMemo, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaExclamationCircle } from "react-icons/fa";
import { MdClose, MdOutlineFilterAlt } from "react-icons/md";
import { trpc } from "utils/trpc";

const limit = 5;

const Index = () => {
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isFilterShowing, setIsFilterShowing] = useState(false);

  const { data: product, isLoading } = trpc.useQuery([
    "product.getAll",
    {
      page,
      limit,
      orderBy,
      sortOrder,
      query: "",
    },
  ]);

  const totalPage = useMemo(
    () => Math.ceil((product ? product[0] : 0) / limit),
    [product]
  );

  return (
    <Layout>
      <Breadcrumb
        data={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <section className="container grid grid-cols-1 gap-6 py-10 md:grid-cols-8">
        <div className="col-span-2 hidden md:block">
          <ProductsFilter />
        </div>
        <div className="col-span-6">
          <div className="flex justify-between">
            <button
              onClick={() => setIsFilterShowing(true)}
              className="flex items-center p-2 md:hidden"
            >
              <MdOutlineFilterAlt size={30} />
              Filter
            </button>
            <div></div>
            <div className="flex items-center">
              <label
                htmlFor="countries"
                className="mr-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Sort By
              </label>
              <select
                onChange={(e) => {
                  const v = e.target.value.split(",");
                  setOrderBy(v[0] as string);
                  setSortOrder(v[1] as "asc" | "desc");
                }}
                className="input-primary"
              >
                <option value="createdAt,desc">New first</option>
                <option value="createdAt,asc">Old first</option>
                <option value="price,desc">Price: high to low</option>
                <option value="price,asc">Price: low to high</option>
              </select>
            </div>
          </div>
          <div className="p-2" />
          <div>
            <Transition
              show={isFilterShowing}
              as={Fragment}
              enter="ease-out transition-opacity duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in transition-opacity duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                onClick={(p) => setIsFilterShowing(!p)}
                className="fixed inset-0 z-30 bg-gray-700 bg-opacity-70"
              ></div>
            </Transition>
            <Transition
              show={isFilterShowing}
              as={Fragment}
              enter="ease-out transition-transform duration-75"
              enterFrom="-translate-x-10"
              enterTo="translate-x-0"
              leave="ease-in transition-transform duration-75"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-10"
            >
              <div className="fixed inset-y-0 left-0 z-40 w-full max-w-sm bg-gray-200 p-4 dark:bg-gray-700 sm:w-2/3">
                <div className="text-right">
                  <button
                    onClick={() => setIsFilterShowing(false)}
                    className="p-2"
                  >
                    <MdClose size={30} />
                  </button>
                </div>
                <ProductsFilter />
              </div>
            </Transition>
          </div>
          <div className="p-2" />
          {isLoading ? (
            <div className="m-auto p-14">
              <div className="flex flex-col items-center justify-center">
                <CgSpinner size={40} className="animate-spin" />
                <h1 className="mt-2 text-lg font-semibold">loading...</h1>
              </div>
            </div>
          ) : null}
          {isLoading || (product && product[1].length) ? null : (
            <div className="m-auto w-96 bg-gray-100 text-center dark:bg-gray-800">
              <div className="flex flex-col items-center justify-center rounded-3xl p-14">
                <FaExclamationCircle size={30} />
                <h1 className="mt-2 text-lg font-semibold">
                  No products found
                </h1>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {product
              ? product[1].map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))
              : null}
          </div>
          <div className="p-2" />
          {/* Pagination */}
          {product && product[1].length ? (
            <nav
              className="flex flex-col items-center justify-between space-y-4 pt-4 md:flex-row"
              aria-label="Table navigation"
            >
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  <>
                    {product[0] === 0 ? 0 : (page - 1) * limit + 1}-
                    {page * limit > product[0] ? product[0] : page * limit}
                  </>
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {product[0]}
                </span>
              </div>
              <ul className="pagination-items inline-flex items-center -space-x-px">
                <li>
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </button>
                </li>
                <li>
                  <button
                    disabled={page >= totalPage}
                    onClick={() => setPage(page + 1)}
                    className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
