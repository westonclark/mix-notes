import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    console.log("in middleware");
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
