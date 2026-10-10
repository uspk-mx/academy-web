import LoginPage from "ui/components/pages/login/login";
import type { Route } from "./+types/home";

import { redirect, useLoaderData } from "react-router";

export function meta({ data }: Route.MetaArgs) {
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

  // The session cookie is shared with the student site, so having one isn't
  // enough: only an admin session skips the form. Anyone else (a student who
  // is signed in on the site) stays here to sign in with an admin account;
  // sending them to "/" bounced back here forever.
  if (sessionToken && (await isAdminSession(sessionToken))) {
    return redirect("/");
  }
};

async function isAdminSession(sessionToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.VITE_API_TARGET}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session_token=${sessionToken}`,
      },
      body: JSON.stringify({ query: "query AdminLoginRole { me { role } }" }),
    });
    if (!response.ok) return false;
    const { data } = await response.json();
    return data?.me?.role === "admin";
  } catch {
    return false;
  }
}

export default function Login() {
  return <LoginPage />;
}
