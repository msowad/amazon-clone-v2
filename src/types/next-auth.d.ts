// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       image?: string;
//       isAdmin: boolean;
//     };
//   }
// }

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string | null;
      isAdmin: boolean;
    };
  }
}
