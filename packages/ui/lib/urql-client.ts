import {
  createClient,
  debugExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  type Exchange,
} from "urql";

// Create a factory function to generate the client with consistent configuration
export function createUrqlClient(options: {
  url: string;
  isServer: boolean;
  sessionToken?: string;
}) {
  const { url, isServer, sessionToken } = options;

  // Create SSR exchange
  const ssr = ssrExchange({
    isClient: !isServer,
    initialState: undefined,
  });

  // Define the exchanges pipeline
  const exchanges: Exchange[] = [
    debugExchange,
    cacheExchange,
    ssr,
    fetchExchange,
  ];

  // Create and return the client
  return createClient({
    url,
    suspense: isServer,
    exchanges,
    fetchOptions: () => {
      const headers: Record<string, string> = {};

      if (sessionToken && isServer) {
        headers.Cookie = `session_token=${sessionToken}`;
      }

      return {
        credentials: "include",
        headers,
      };
    },
  });
}

// Create a singleton instance for client-side use
let clientSideClient: ReturnType<typeof createClient> | null = null;

export function getClientSideClient(
  url: string
): ReturnType<typeof createClient> {
  if (typeof window === "undefined") {
    throw new Error(
      "getClientSideClient should only be called in browser environment"
    );
  }

  if (!clientSideClient) {
    clientSideClient = createUrqlClient({
      url,
      isServer: false,
    });
  }

  return clientSideClient;
}
