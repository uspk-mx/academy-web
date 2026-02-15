
import LoginPage from "../pages/login/login";

import { redirect } from "react-router";

export function meta() {
  return [
    { title: "Uspk Academy | Inicia Sesión" },
    { name: "description", content: "Bienvenido a Uspk Academy!" },
  ];
}

type LoaderData = { isAdminSubdomain: boolean };

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || []
  );

  const sessionToken = cookies.session_token;
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0];
  const isAdminSubdomain = hostname.startsWith("admin.");

  if (sessionToken) {
    return redirect("/");
  }

  return { isAdminSubdomain }; // Proceed if authenticated
};

export default function Login() {
  return  <LoginPage />
}
