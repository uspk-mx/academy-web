import { redirect, useNavigate } from "react-router";

import { useEffect } from "react";
import type { Route } from "./+types/home";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || []
  );

  const sessionToken = cookies.session_token;

  if (!sessionToken) {
    return redirect("/login");
  }

  return null; // Proceed if authenticated
};

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <></>;
}
