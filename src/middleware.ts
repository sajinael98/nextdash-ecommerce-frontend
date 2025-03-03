import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (!token) {
        return false;
      }
      return true;
    },
  },
});

export const config = {
  matcher: [
    "/((?!login|$|public/|api|public/food-menu|_next/static|favicon.ico|menu).*)/",
  ],
};