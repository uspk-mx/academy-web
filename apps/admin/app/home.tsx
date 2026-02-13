import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { useEffect } from "react";

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Uspk Academy" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    navigate("/courses");
  }, []);
  return null;
}
