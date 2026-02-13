import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Courses() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/courses/catalog");
  }, [navigate]);
  return null;
}
