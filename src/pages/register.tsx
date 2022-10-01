import { IoAlertCircle } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLayout, Input, LoadingButton } from "components";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "utils/trpc";
import { IRegister, registerSchema } from "utils/validation/auth";

const Register = () => {
  const [error, setError] = useState("");

  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({ resolver: zodResolver(registerSchema) });
  const { mutateAsync: createUser, isLoading } = trpc.useMutation([
    "auth.register",
  ]);

  const onSubmit = useCallback(
    async (data: IRegister) => {
      setError("");
      try {
        const result = await createUser(data);
        console.log({ result });
      } catch (e: any) {
        setError(e.message);
      }
    },
    [createUser]
  );

  return (
    <FormLayout register title="Create a new account">
      <form
        className="space-y-4 md:space-y-6"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="name"
          label="Your name"
          type="text"
          placeholder="John Doe"
          register={form}
          autofocus
          error={errors.name?.message}
        />
        <Input
          label="Your email"
          name="email"
          type="email"
          placeholder="name@company.com"
          register={form}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          register={form}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          register={form}
          error={errors.confirmPassword?.message}
        />
        <div className="flex items-center">
          <div className="flex h-5 items-center">
            <input
              id="agree-terms"
              aria-describedby="agree-terms"
              type="checkbox"
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 accent-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="agree-terms"
              className="text-gray-500 dark:text-gray-300"
            >
              I accept the{" "}
              <a
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                href="#"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <LoadingButton
          isLoading={isLoading}
          type="submit"
          label="Create account"
        />
        {error && (
          <p className="mt-1 flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white dark:bg-red-400 dark:text-black">
            <IoAlertCircle width={30} className="mr-2" />
            {error}
          </p>
        )}
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account{" "}
          <Link href="login" passHref>
            <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Sign in
            </a>
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};

export default Register;
