import { withAuth } from "next-auth/middleware";

const isAuthorized = (token) => !!token;

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => isAuthorized(token),
  },
});

export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.ico|login|free-api/|$).*)",
  ],
};