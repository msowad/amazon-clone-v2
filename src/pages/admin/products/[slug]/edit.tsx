import { Combobox, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLayout, Button, ButtonLink, Input } from "components";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { MdArrowBackIos, MdCheck } from "react-icons/md";
import { handleFormError } from "utils";
import { trpc } from "utils/trpc";
import { IProduct, productSchema } from "utils/validation";

const Edit: NextPage = () => {
  const router = useRouter();

  const { data: categories, isSuccess: isCategoriesSuccess } = trpc.useQuery([
    "category.getOnlyName",
  ]);
  const { data: product } = trpc.useQuery([
    "product.get",
    router.query.slug as string,
  ]);

  const [selectedCategories, setSelectedCategories] = useState<
    { name: string }[]
  >([]);
  const [disSelectedCategories, setDisSelectedCategories] = useState<
    { name: string }[]
  >([]);
  const [categoryQuery, setCategoryQuery] = useState("");

  const { mutateAsync: updateProduct, isLoading } = trpc.useMutation(
    "admin.product.update"
  );

  const filteredCategories =
    categoryQuery === ""
      ? categories || []
      : categories?.filter((c) =>
          c.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(categoryQuery.toLowerCase().replace(/\s+/g, ""))
        );

  const {
    register: form,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (product) {
      const defaultValues: IProduct = {
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price.toString(),
        stock: product.stock.toString(),
      };
      reset({ ...defaultValues });
      if (categories) {
        setSelectedCategories(
          categories.filter((c) =>
            product.categories.some((pc) => pc.name === c.name)
          )
        );
      }
    }
  }, [product, reset, categories]);

  const onSubmit = useCallback(
    async (data: IProduct) => {
      if (!product) return;
      toast.promise(
        updateProduct({
          ...data,
          id: product.id,
          categories: selectedCategories,
          disSelectedCategories,
        }),
        {
          loading: "Updating...",
          success: ({ status, message }) => {
            if (status === 200) {
              router.back();
            }
            return message;
          },
          error: (e) => handleFormError(e),
        }
      );
    },
    [product, router, selectedCategories, updateProduct, disSelectedCategories]
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Update Product ({product?.name})</h1>
        <ButtonLink
          href="/admin/products"
          label="All Products"
          secondary
          icon={<MdArrowBackIos size={20} />}
        />
      </div>
      <form className="my-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          name="name"
          label="Name"
          type="text"
          placeholder="Enter product name"
          register={form}
          autofocus
          error={errors.name?.message}
        />
        <div className="p-2"></div>
        <div>
          <label htmlFor="categories" className="mb-2 block text-sm">
            Categories
          </label>
          {isCategoriesSuccess && (
            <Combobox
              value={selectedCategories}
              onChange={(values) => {
                const dc = product?.categories.filter(
                  (c) => !values.find((v) => v.name === c.name)
                );
                setDisSelectedCategories(dc || []);
                setSelectedCategories(values);
              }}
              multiple
            >
              <div className="relative mt-1">
                <Combobox.Button className="relative w-full cursor-pointer overflow-hidden rounded-lg text-left focus:outline-none sm:text-sm">
                  <Combobox.Input
                    className="input-primary w-full cursor-pointer !pr-10"
                    displayValue={(values: { name: string }[]) =>
                      values.map((v) => v.name).join(", ")
                    }
                    placeholder="Select categories"
                    readOnly
                    onChange={(event) => setCategoryQuery(event.target.value)}
                  />
                  <div className="absolute top-1.5 right-0 items-center pr-2">
                    <HiChevronUp
                      className="-mb-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <HiChevronDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </Combobox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setCategoryQuery("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm">
                    <div className="px-3 py-1">
                      <input
                        className="input-primary w-full"
                        autoFocus
                        type="text"
                        value={categoryQuery}
                        placeholder="Search categories"
                        onChange={(event) =>
                          setCategoryQuery(event.target.value)
                        }
                      />
                    </div>
                    {filteredCategories?.length === 0 &&
                    categoryQuery !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4">
                        Nothing found.
                      </div>
                    ) : (
                      filteredCategories?.map((c) => (
                        <Combobox.Option
                          key={c.name}
                          className="relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-gray-300 hover:dark:bg-gray-900"
                          value={c}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {c.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <MdCheck
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          )}
        </div>
        <div className="p-2"></div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="price"
            label="Price"
            type="number"
            placeholder="Enter product price"
            register={form}
            error={errors.price?.message}
          />
          <Input
            name="stock"
            label="Stock"
            type="number"
            placeholder="Enter product stock"
            register={form}
            error={errors.stock?.message}
          />
        </div>
        <div className="p-2"></div>
        <div>
          <label htmlFor="shortDescription" className="mb-2 block text-sm">
            Short Description
          </label>
          <textarea
            {...form("shortDescription")}
            placeholder="Enter product short description"
            rows={3}
            className="input-primary w-full"
          />
          {errors.shortDescription?.message && (
            <p className="mt-1 block text-sm font-medium text-red-600 dark:text-red-400">
              {errors.shortDescription?.message}
            </p>
          )}
        </div>
        <div className="p-2"></div>
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            {...form("description")}
            placeholder="Enter product description"
            rows={8}
            className="input-primary w-full"
          />
          {errors.description?.message && (
            <p className="mt-1 block text-sm font-medium text-red-600 dark:text-red-400">
              {errors.description?.message}
            </p>
          )}
        </div>
        <div className="p-2"></div>
        <Button
          disabled={isLoading}
          type="submit"
          label="Update product"
          fullWidth
        />
      </form>
    </AdminLayout>
  );
};

export default Edit;
