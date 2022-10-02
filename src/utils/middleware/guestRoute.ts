import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

export const guestRoute =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );

    if (session) {
      return {
        redirect: {
          destination: "/",
          permanent: true,
        },
      };
    }

    return await func(ctx);
  };
