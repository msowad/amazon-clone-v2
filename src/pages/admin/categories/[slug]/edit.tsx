import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLayout, Button, ButtonLink, Input } from "components";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { handleFormError } from "utils";
import { trpc } from "utils/trpc";
import { categorySchema, ICategory } from "utils/validation";

const Edit: NextPage = () => {
  const router = useRouter();

  const { data: category } = trpc.useQuery([
    "category.get",
    router.query.slug as string,
  ]);

  const { mutateAsync: updateCategory, isLoading } = trpc.useMutation(
    "admin.category.update"
  );

  const {
    register: form,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (category?.name) {
      const defaultValues: ICategory = { name: category.name };
      defaultValues.name = category.name;
      reset({ ...defaultValues });
    }
  }, [category, reset]);

  const onSubmit = useCallback(
    async (data: ICategory) => {
      if (!category) return;
      toast.promise(updateCategory({ ...data, id: category.id }), {
        loading: "Updating...",
        success: ({ status, message }) => {
          if (status === 200) {
            router.back();
          }
          return message;
        },
        error: (e) => handleFormError(e),
      });
    },
    [category, router, updateCategory]
  );

  if (!category) {
    return (
      <AdminLayout>
        <div className="flex h-96 flex-col items-center justify-center">
          <FaExclamationTriangle size={25} />
          <h1 className="my-3 text-xl font-semibold">Category Not Found</h1>
          <ButtonLink href="/admin/categories" label="View all categories" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Update Category ({category?.name})
        </h1>
        <ButtonLink
          href="/admin/categories"
          label="All Category"
          secondary
          icon={<MdArrowBackIos size={20} />}
        />
      </div>
      <form className="my-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          name="name"
          label="Category name"
          type="text"
          placeholder="Enter category name"
          register={form}
          autofocus
          error={errors.name?.message}
        />
        <div className="p-2"></div>
        <Button
          disabled={isLoading}
          type="submit"
          label="Update category"
          fullWidth
        />
      </form>
    </AdminLayout>
  );
};

export default Edit;
