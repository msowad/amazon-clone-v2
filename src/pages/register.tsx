import { FormLayout, Button, Input } from "components";
import Link from "next/link";

const Register = () => {
  return (
    <FormLayout register title="Create a new account">
      <form className="space-y-4 md:space-y-6" noValidate>
        <Input
          label="Your name"
          name="name"
          type="text"
          placeholder="John Doe"
        />
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
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
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
        <Button type="submit" label="Create account" />
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
