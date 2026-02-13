import type { JSX, PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { isDefined } from "../lib/guards";

interface RequestProps {
  xsrf: string | null;
  requestId?: string | null;
}

const RequestContext = createContext<RequestProps | null>(null);

export function RequestProvider({
  xsrf,
  requestId,
  children,
}: PropsWithChildren<RequestProps>): JSX.Element {
  const [token, setToken] = useState<string | null>(xsrf);

  useEffect(() => {
    if (isDefined(xsrf)) {
      return;
    }

    /** Can be removed if cookie consent dialog is implemented in simple shop */
    setToken(
      document.querySelector('[name="csrf-token"]')?.getAttribute("content") ||
        null
    );
  }, [xsrf, token]);

  return (
    <RequestContext.Provider value={{ xsrf: token, requestId }}>
      {children}
    </RequestContext.Provider>
  );
}

export const useRequestContext = (): RequestProps => {
  const context = useContext(RequestContext);
  if (!isDefined(context)) {
    throw new Error(
      "No request context provided. At least `xsrf` must be available. Please wrap your application with a `RequestProvider`"
    );
  }

  return context;
};
