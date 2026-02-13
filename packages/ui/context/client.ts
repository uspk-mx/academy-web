import { fetchExchange } from "@urql/core";
import { devtoolsExchange } from "@urql/devtools";
import {
  cacheExchange as normalizedCacheExchange,
  type UpdatesConfig,
} from "@urql/exchange-graphcache";
import { persistedExchange } from "@urql/exchange-persisted";
import { cacheExchange, createClient, ssrExchange } from "urql";
import { getHeadersForId, isCSR } from "ui/lib/guards";

type Props = {
  /** Always `true` except for dev mode */
  isPersistedOperationsEnabled?: boolean;
  /** Passed to `fetchOptions` */
  headers?: Record<string, string>;
  /**
   * Defaults to `/api/graphql` when undefined in the client
   *
   * When `isPersistedOperationsEnabled` is set to true for dev mode
   * use `/api/persisted-graphql`
   */
  clientUrl?: "/api/persisted-graphql" | "/api/graphql" | string;
  secretToken?: string | null;
  /**
   * If request id is provided, and SSR we get the request scoped headers based on this id
   */
  requestId?: string | null;
  cacheUpdaters?: UpdatesConfig;
  useNormalizedCache?: boolean;
};

export const useClient = (props: Props) => {
  // const { xsrf, requestId } = useRequestContext();
  return getClient({ ...props, headers: { ...props.headers } });
};

export const getClient = ({
  headers = {},
  requestId,
  clientUrl,
  cacheUpdaters = {},
  useNormalizedCache = false,
  ...options
}: Props) => {
  const ssrCache = ssrExchange({
    isClient: isCSR(globalThis),
  });

  const exchanges = [
    useNormalizedCache
      ? normalizedCacheExchange({ updates: cacheUpdaters })
      : cacheExchange,
    ssrCache,
  ];

  if (isCSR(globalThis)) {
    Object.assign(headers, { "m2-page-id": requestId });
    if (options.secretToken) {
      Object.assign(headers, { "": options.secretToken });
    }
  }

  if (!isCSR(globalThis) && requestId) {
    Object.assign(headers, getHeadersForId(requestId));
  }

  /**
   * In dev modus persisted queries is disabled, since otherwise you need to
   * upload the persisted documents to the server to enable them.
   */
  if (options?.isPersistedOperationsEnabled) {
    exchanges.push(
      persistedExchange({
        enforcePersistedQueries: true,
        enableForMutation: true,
        generateHash: (_, document) =>
          Promise.resolve(
            (document as unknown as { __meta__: { hash: string } }).__meta__
              .hash
          ),
      })
    );
  }

  exchanges.push(fetchExchange);

  /*
   * The devtoolsExchange forwards the request without actually using it on prod and ssr.
   * The additional isCSR check acts as an additional client side only check.
   * For more info see: https://github.com/urql-gql-generated/urql-devtools-exchange/blob/master/src/exchange.ts#L152C2-L153C39
   */
  if (isCSR(globalThis)) {
    exchanges.unshift(devtoolsExchange);
  }

  return {
    ssrCache,
    client: createClient({
      // change to /api/persisted-graphql if you want to test persisted ops on dev
      // url: '/api/persisted-graphql',
      url: import.meta.env.VITE_API_TARGET
        ? `${import.meta.env.VITE_API_TARGET}/query`
        : "http://localhost:4000/query",
      exchanges,
      fetchOptions: () => {
        return {
          errorPolicy: !isCSR(globalThis) ? "ignore" : "all",
          keepalive: !isCSR(globalThis), // default is false
          headers: {
            ...headers,
          },
        };
      },
    }),
  };
};

function getGraphQLUrl(clientUrl = "/query") {
  // Only import server config when not on client
  if (isCSR(globalThis)) {
    return clientUrl;
  }
  return `${import.meta.env.VITE_API_TARGET}`;
}
