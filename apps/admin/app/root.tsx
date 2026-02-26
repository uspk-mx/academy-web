import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { TooltipProvider } from "ui/components/tooltip";

import type { Route } from "./+types/root";
import "ui/globals.css";
import {
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  Provider,
  ssrExchange,
} from "urql";
import { isServerSide } from "ui/lib/ssr-exchange";
import { logos } from "ui/lib/config/site";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
  },
  {
    rel: "icon",
    href: logos.favicon.icon96,
    sizes: "96x96",
    type: "image/png",
  },
  {
    rel: "icon",
    href: logos.favicon.iconSvg,
    sizes: "any",
    type: "image/svg+xml",
  },
  {
    rel: "shortcut icon",
    href: logos.favicon.icon,
  },
  {
    rel: "apple-touch-icon",
    href: logos.favicon.appleTouchIcon,
    sizes: "180x180",
  },
  {
    rel: "manifest",
    href: "/site.webmanifest",
  },
];

const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: undefined,
});

const urqlClient = createClient({
  url: `${import.meta.env.VITE_API_TARGET}/query`,
  exchanges: [debugExchange, cacheExchange, ssr, fetchExchange],
  fetchOptions: {
    credentials: "include",
  },
  suspense: isServerSide,
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="apple-mobile-web-app-title" content="Uspk Academy Admin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider value={urqlClient}>
          <TooltipProvider>{children}</TooltipProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
