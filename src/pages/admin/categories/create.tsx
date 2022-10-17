import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLayout, Button, ButtonLink, Input } from "components";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";
import { handleFormError } from "utils";
import { trpc } from "utils/trpc";
import { categorySchema, ICategory } from "utils/validation";

const Create = () => {
  const router = useRouter();

  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>({ resolver: zodResolver(categorySchema) });

  const { mutateAsync: createCategory, isLoading } = trpc.useMutation(
    "admin.category.create"
  );

  const onSubmit = useCallback(
    async (data: ICategory) => {
      toast.promise(createCategory(data), {
        loading: "Saving...",
        success: ({ status, message }) => {
          if (status === 201) {
            router.push("/admin/categories");
          }
          return message;
        },
        error: (e) => handleFormError(e),
      });
    },
    [createCategory, router]
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Category</h1>
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
          label="Add category"
          fullWidth
        />
      </form>
    </AdminLayout>
  );
};

export default Create;
