import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdminLayout,
  ButtonLink,
  FormError,
  Input,
  LoadingButton,
} from "components";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { MdArrowBackIos } from "react-icons/md";
import { trpc } from "utils/trpc";
import { categorySchema, ICategory } from "utils/validation";

const Create = () => {
  const router = useRouter();
  const [error, setError] = useState("");

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
      setError("");
      try {
        const result = await createCategory(data);
        if (result.status === 201) {
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
        <FormError error={error} className="mb-3" />
        <LoadingButton
          type="submit"
          label="Add category"
          isLoading={isLoading}
        />
      </form>
    </AdminLayout>
  );
};

export default Create;
