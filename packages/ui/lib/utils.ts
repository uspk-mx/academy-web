import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

export function getInitials(name: string): string {
  const [firstName, lastName] = name.split(" ");
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

export const noop = () => {};

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void {
  if (obj?.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement["addEventListener"]>)
    );
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T["removeEventListener"]>
    | [string, Function | null, ...any]
): void {
  if (obj?.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement["removeEventListener"]>)
    );
  }
}

export const isBrowser = typeof window !== "undefined";

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function removeAcademyDataPrefix(input: string) {
  const prefix = "https://academy-data.nyc3.digitaloceanspaces.com/";
  if (input.startsWith(prefix)) {
    return input.slice(prefix.length);
  } else {
    return input;
  }
}

export function extractFilename(value: string) {
  const fileRegex = /\/([^/]+)$/

  const match = value.match(fileRegex)

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}


export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: 'numeric',
    ...options
  })
}

export function formatCourseDuration(duration: number): string {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
}

// function formatDuration(duration: number): JSX.Element {
//   const hours = Math.floor(duration / 3600);
//   const minutes = Math.floor((duration % 3600) / 60);
//   const seconds = duration % 60;

//   return (
//     <p className="text-sm text-muted-foreground">
//       {hours > 0 ? `${hours}h ` : ""}
//       {minutes > 0 ? `${minutes}m ` : ""}
//       {seconds > 0 ? `${seconds}s` : ""}
//     </p>
//   );
// }