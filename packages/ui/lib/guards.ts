export function isDefined<T>(val: T): val is NonNullable<T> {
  // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
  return val !== null && typeof val != "undefined";
}

export const isCSR = <T extends typeof globalThis>(
  globalRef: T
): globalRef is T & { window: Window } => {
  return isDefined(globalRef.window);
};

// The local map, which should stay empty in client context.
const headersMap = new Map<string, Record<string, string>>();

/**
 * Get additional headers, that might be set for the page id withing the serverside context.
 * @param requestId
 */
export const getHeadersForId = (requestId: string) => {
  // Only allow to use this functionality for serverside.
  // You should add the Mock file for the client if you get this error.
  if (globalThis.window) {
    throw new Error("This functionality should not be used in the client");
  }
  const headers = headersMap.get(requestId);
  if (!headers) {
    console.error(`Could not find headers for request: ${requestId}`);
    return null;
  }
  return headers;
};
