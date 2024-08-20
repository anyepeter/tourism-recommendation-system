import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware(
    {
        publicRoutes: ["/", "/contact", "/about", "/sawa", "/grassfield", "/fang-beti", "/sudano-sahelian","/about","/(api|trpc)(.*)", "/dashboard", "/dashboard/comment", "/dashboard/hotel", "/dashboard/ai"],
      }
);

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};