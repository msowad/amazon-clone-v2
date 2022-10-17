import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLayout, Button, ButtonLink, Input } from "components";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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

  const { mutateAsync: updateCategory } = trpc.useMutation(
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
            router.push("/admin/categories");
          }
          return message;
        },
        error: (e) => handleFormError(e),
      });
    },
    [category, router, updateCategory]
  );

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
        <Button type="submit" label="Update category" fullWidth />
      </form>
    </AdminLayout>
  );
};

export default Edit;
