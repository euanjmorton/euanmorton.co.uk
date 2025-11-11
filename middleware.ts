export const runtime = "nodejs";
export {auth as middleware} from "@/auth"

export const config = {
  matcher: ["/nome/:path"],
  runtime: 'nodejs' // Required to not use the Edge runtime... for some reason. TODO: figure out why
}