import { Info } from "lucide-react";
import { Button } from "ui/components/button";
import { Alert, AlertDescription, AlertTitle } from "ui/components/alert";

interface TimeoutNotificationProps {
  attemptsUsed: number;
  maxAttempts: number;
  onRetry: () => void;
}

export const TimeoutNotification = ({
  attemptsUsed,
  maxAttempts,
  onRetry,
}: TimeoutNotificationProps) => {
  const attemptsLeft = maxAttempts - attemptsUsed;
  return (
    <Alert className="max-w-3xl mx-auto mt-6">
      <Info className="h-4 w-4" />
      <AlertTitle>Se acabo el tiempo</AlertTitle>
      <AlertDescription>
        Desafortunadamente, el tiempo limite para este cuestionario a expirado.
      </AlertDescription>
      {attemptsLeft > 0 ? (
        <div>
          <p className="text-sm mb-4">
            Aun tienes {attemptsLeft}{" "}
            {attemptsLeft === 1 ? "un intento" : "intentos"} disponibles. ¿Te
            gustaria intentarlo nuevamente?
          </p>
          <Button
            variant="noShadow"
            className="bg-black text-white mr-auto"
            onClick={onRetry}
            type="button"
          >
            Reiniciar cuestionario
          </Button>
        </div>
      ) : (
        <p className="text-gray-600">
          Has utilizado todos tus intentos para este cuestionario.
        </p>
      )}
    </Alert>
  );
};
