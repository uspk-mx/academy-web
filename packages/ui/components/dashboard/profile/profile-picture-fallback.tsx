import type { ComponentProps } from "react";
import { cn } from "ui/lib/utils";

export const ProfilePictureFallback = ({
  className,
  ...rest
}: ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...rest}
    >
      <title>Mi foto de perfil</title>
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="#F5C842"
        stroke="#2C2C2C"
        stroke-width="4"
      />

      <circle
        cx="100"
        cy="100"
        rx="40"
        ry="40"
        fill="#FFFFFF"
        stroke="#2C2C2C"
        stroke-width="3"
      />

      <circle cx="88" cy="90" r="4" fill="#2C2C2C" />
      <circle cx="112" cy="90" r="4" fill="#2C2C2C" />

      <path
        d="M 80 110 Q 100 125 120 110"
        fill="none"
        stroke="#2C2C2C"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
};
