import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware(
    {
        publicRoutes: ["/", "/contact", "/about", "/lake", "/mountain", "/beach", "/forest","/about","/(api|trpc)(.*)"],
      }
);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};