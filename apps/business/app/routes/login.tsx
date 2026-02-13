import { BusinessLogin } from "ui/components/pages/login/bussiness-login";
import type { Route } from "./+types/home";

import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Uspk Academy | Inicia Sesion" },
    { name: "description", content: "Bienvenido a Uspk Academy!" },
  ];
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || [],
  );

  const sessionToken = cookies.session_token;
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0];
  const isAdminSubdomain = hostname.startsWith("admin.");

  if (sessionToken) {
    return redirect("/");
  }
};

export default function LoginPage() {
  return <BusinessLogin />;
}
