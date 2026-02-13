import confetti from "canvas-confetti";
import { redirect } from "react-router";
import { CourseEmptyPage } from "ui/components/courses/course-empty-page";

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = Object.fromEntries(
    cookieHeader?.split("; ").map((cookie) => cookie.split("=")) || []
  );

  const sessionToken = cookies["session_token"];

  if (!sessionToken) {
    // Redirect to login if session token is missing
    return redirect("/login");
  }

  return null;
};

// Confetti configuration
const confettiConfig = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
};

export default function Certificates() {
  const createConfetti = () => {
    confetti(confettiConfig);
    // Add a second burst for more effect
    setTimeout(() => {
      confetti({
        ...confettiConfig,
        particleCount: 50,
        spread: 100,
        origin: { y: 0.7 },
      });
    }, 200);
  };

  return (
    <CourseEmptyPage
      title="Seccion en construccion"
      description="Pronto podras ver y administrar los certificados"
      buttonLabel="Muestra la sorpresa"
      action={createConfetti}
    />
  );
}
