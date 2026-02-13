import type { ReactNode } from "react";
import {
  Provider,
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

import { useState } from "react";
import {
  NextSSRProvider,
  isServerSide,
  useCreateNextSSRExchange,
} from "./ssr-exchange";

export function createUrqlClient(
  isServer: boolean,
  initialState = undefined,
  request?: Request
) {
  const ssr = ssrExchange({
    isClient: !isServer,
    initialState,
  });

  const cookie = request?.headers.get("cookie");
  const API_URL = import.meta.env.VITE_API_TARGET
    ? `${import.meta.env.VITE_API_TARGET}/query`
    : "http://localhost:4000/query";

  return {
    client: createClient({
      url: API_URL,
      exchanges: [debugExchange, cacheExchange, ssr, fetchExchange],
      fetchOptions: () => ({
        credentials: "include",
      }),
      suspense: isServer, // important for SSR
    }),
    ssr,
  };
}
export function UrqlProvider({
  children,
  sessionToken,
}: {
  children: ReactNode;
  sessionToken?: string;
}) {
  const nextSSRExchange = useCreateNextSSRExchange();
  const url = import.meta.env.VITE_API_TARGET
    ? `${import.meta.env.VITE_API_TARGET}/query`
    : "http://localhost:4000/query";

  const [queryClient] = useState(() =>
    createClient({
      url,
      suspense: isServerSide,
      exchanges: [debugExchange, cacheExchange, nextSSRExchange, fetchExchange],
      fetchOptions: () => ({
        credentials: "include",
        headers: sessionToken
          ? {
              Cookie: `session_token=${sessionToken}`,
            }
          : undefined,
      }),
    })
  );

  return (
    <Provider value={queryClient}>
      <NextSSRProvider>{children}</NextSSRProvider>
    </Provider>
  );
}
