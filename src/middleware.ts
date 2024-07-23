import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware(
    {
        publicRoutes: ["/", "/contact", "/about", "/lake", "/mountain", "/beach", "/forest","/about","/(api|trpc)(.*)", "/dashboard", "/dashboard/comment", "/dashboard/hotel", "/dashboard/ai", "/admin", "/admin/addSite"],
      }
);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};