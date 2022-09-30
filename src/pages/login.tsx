import { Button, FormLayout, Input } from "components";
import Link from "next/link";

const Login = () => {
  return (
    <FormLayout title="Sign in to your account">
      <form className="space-y-4 md:space-y-6" noValidate>
        <Input
          label="Your email"
          name="email"
          type="email"
          placeholder="name@company.com"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
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
        <Button type="submit" label="Sign in" />
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
