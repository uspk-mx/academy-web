import type { Client } from "@urql/core";
import type { JSX, PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { useClient } from "./client";
import { Provider } from "urql";

type Props = PropsWithChildren<Parameters<typeof useClient>[number]>;

interface UrqlContextType {
  client: Client;
}

const UrqlContext = createContext<null | UrqlContextType>(null);

export const useUrqlClient = (): UrqlContextType => {
  const context = useContext(UrqlContext);
  if (context === null)
    throw new Error("Please wrap the component in <UrqlProvider>");
  return context;
};

export function UrqlProvider({ children, ...props }: Props): JSX.Element {
  const { client } = useClient({ ...props });

  return (
    <UrqlContext.Provider value={{ client: client }}>
      <Provider value={client}>{children}</Provider>
    </UrqlContext.Provider>
  );
}
