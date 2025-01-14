// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken";

// export async function middleware(req: NextRequest) {
//   const token =
//     req.cookies.get("next-auth.session-token")?.value ||
//     req.cookies.get("__Secure-next-auth.session-token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/404", req.url));
//   }

//   try {
//     const decoded = verify(token, process.env.NEXTAUTH_SECRET!) as {
//       is_superuser: boolean;
//     };

//     if (!decoded.is_superuser) {
//       return NextResponse.redirect(new URL("/404", req.url));
//     }
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return NextResponse.redirect(new URL("/404", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/admin/:path*",
// };
