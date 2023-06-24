import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // afterAuth(auth, req, evt) {},
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
