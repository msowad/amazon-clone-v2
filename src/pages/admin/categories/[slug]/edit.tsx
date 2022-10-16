import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdminLayout,
  ButtonLink,
  FormError,
  Input,
  LoadingButton,
} from "components";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdArrowBackIos } from "react-icons/md";
import { trpc } from "utils/trpc";
import { categorySchema, ICategory } from "utils/validation";

const Edit: NextPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: category } = trpc.useQuery([
    "admin.category",
    router.query.slug as string,
  ]);

  const { mutateAsync: updateCategory, isLoading } = trpc.useMutation(
    "admin.updateCategory"
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
      try {
        if (!category) return;
        const result = await updateCategory({ ...data, id: category.id });
        if (result.status === 200) {
          return router.push("/admin/categories");
        }
        setError("Somethings went wrong. Please try again later");
      } catch (e) {
        if (typeof e === "string") {
          setError(e);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      }
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
        <FormError error={error} className="mb-3" />
        <LoadingButton
          type="submit"
          label="Update category"
          isLoading={isLoading}
        />
      </form>
    </AdminLayout>
  );
};

export default Edit;
