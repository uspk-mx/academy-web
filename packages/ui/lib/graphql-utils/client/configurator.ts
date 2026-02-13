import { GraphQLClient } from 'graphql-request';
import { isCSR } from 'ui/lib/guards';

export type Wrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
export type Factory<T> = (client: GraphQLClient, withWrapper: Wrapper) => T;

function getGraphQLUrl() {
  // Only import server config when not on client.
  if (isCSR(globalThis)) {
    //@ts-ignore
    return `${import.meta.env.VITE_API_TARGET}/query`;
  }
      //@ts-ignore
  return `${import.meta.env.VITE_API_TARGET}/query`;
}

export const client = new GraphQLClient(getGraphQLUrl(), {
  errorPolicy: !globalThis.window ? "ignore" : "all",
  keepalive: false, // default is false
  ...(!globalThis.window ? { fetch: globalThis.fetch } : {}),
});

const getWrapper =
  (requestHeaders?: Record<string, string>): Wrapper =>
  (action, _operationName) => {

    // Catch general sdk errors
    return action(requestHeaders).catch((err) => {
      if (err?.response) {
        // when the error has a response, we assume it's not a network error.
        console.error({ err }, `Failed to fetch '${_operationName}'`);
      } else {
        // All other errors are concidered to be network errors.
        console.error({ err }, `Network request failed for '${_operationName}'`);
      }
      // Reject again to have custom implementation on how to behave on missing data.
      return Promise.reject(err);
    });
  };

/**
 * Instantiates a codegen generated SDK based on connection details factoring in
 * environment details and assumptions about the architecture. (Like the
 * assumption that code connecting to the Graphql API is expected to go through the
 * gateway.)
 *
 * @param factory A function producing an SDK based on
 * https://www.graphql-code-generator.com/plugins/typescript-graphql-request
 * @param requestHeaders
 * @returns A client that is ready-to-rock, regardless if you're using it
 * client-side or server-side.
 */
export const instantiate = <T>(factory: Factory<T>, requestHeaders?: Record<string, string>): T => {
  return factory(client, getWrapper(requestHeaders));
};
