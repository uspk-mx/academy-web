import { parse } from "cookie";

export async function getUserSession(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = parse(cookieHeader);
  const sessionToken = cookies.session_token;
  return sessionToken;
}
