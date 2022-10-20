import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;
      if (pathname.includes("/admin/") && !token?.isAdmin) {
        return false;
      }
      return true;
    },
  },
});
