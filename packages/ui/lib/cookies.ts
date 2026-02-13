export function getCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = cookieHeader
    ?.split(";")
    .reduce((acc: Record<string, string>, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});
  const cookie = cookies ? cookies[name] : undefined;
  return [cookies, cookie] as const;
}
