import { Minus } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Badge } from "ui/components/badge";
import { Button } from "ui/components/button";
import { cn } from "ui/lib/utils";

interface SectionStepProps {
  step: number;
  label: string;
  href: string;
  isActive: boolean;
  isLast?: boolean;
  className?: string;
  onClick?: () => void;
}

export function SectionStep({
  step,
  label,
  isActive,
  isLast,
  href,
  className,
  onClick,
}: SectionStepProps) {
  const navigate = useNavigate();
  const { cid } = useParams();
  return (
    <div className="flex items-center">
      <Button
        className={cn(
          "flex items-center p-1 data-[active=false]:text-gray-400 hover:no-underline",
          className,
        )}
        data-active={isActive}
        onClick={() => {
          navigate(`/courses/${cid}/${href}`);
          onClick?.();
        }}
        variant="ghost"
      >
        <Badge
          className="data-active justify-center flex size-6 data-[active=true]:dark:bg-white data-[active=true]:dark:text-blac"
          data-active={isActive}
          variant={isActive ? "dark" : "neutral"}
          shape="rounded"
        >
          {step}
        </Badge>
        <span className="ml-2">{label}</span>
      </Button>
      {!isLast ? <Minus className="mx-2 w-4 h-4" /> : isLast}
    </div>
  );
}
