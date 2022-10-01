import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLayout, Input, LoadingButton } from "components";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { ILogin, loginSchema } from "utils/validation/auth";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { callbackUrl } = router.query;

  const {
    register: form,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: zodResolver(loginSchema) });

  const onSubmit = useCallback(
    async (values: ILogin) => {
      setIsLoading(true);
      const data: SignInResponse | undefined = await signIn("credentials", {
        redirect: false,
        ...values,
      });
      setIsLoading(false);
      if (data?.status === 200) {
        return router.push(callbackUrl?.toString() ?? "/");
      }
      setError(data?.error ?? "Somethings went wrong. Please try again later");
    },
    [callbackUrl, router]
  );

  return (
    <FormLayout title="Sign in to your account">
      <form
        className="space-y-4 md:space-y-6"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Your email"
          name="email"
          type="email"
          placeholder="name@company.com"
          register={form}
          autofocus
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
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 accent-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </a>
        </div>
        <LoadingButton isLoading={isLoading} type="submit" label="Sign in" />
        {error && (
          <p className="mt-1 flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white dark:bg-red-400 dark:text-black">
            <ExclamationCircleIcon width={30} className="mr-2" />
            {error}
          </p>
        )}
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link href="/register" passHref>
            <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Sign up
            </a>
          </Link>
        </p>
      </form>
    </FormLayout>
  );
};

export default Login;
