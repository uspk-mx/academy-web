import SignUpPage from "../pages/signup/signup";
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
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || []
  );

  const sessionToken = cookies["session_token"];

  if (sessionToken) {
    // Redirect to login if session token is missing
    return redirect("/");
  }

  return null; // Proceed if authenticated
};

export default function SignUp() {

  return <SignUpPage />;
}
