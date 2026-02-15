import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { type CombinedError, type UseQueryExecute, useQuery } from "urql";
import { GetProfileDocument, MeDocument } from "gql-generated/gql/graphql";
import type { GetProfileQuery, GetProfileQueryVariables, MeQuery } from "gql-generated/gql/graphql";

const CustomerContext = createContext<{
  customerData: MeQuery["me"] | null;
  fetching?: boolean;
  error?: CombinedError | null;
  refetchQuery?: UseQueryExecute;
}>({
  customerData: null,
});

type CustomerContextProviderProps = {
  children?: ReactNode;
};

export const CustomerContextProvider = ({
  children,
}: CustomerContextProviderProps) => {
  const [{ data, fetching, error}, refetchQuery] = useQuery<
    GetProfileQuery,
    GetProfileQueryVariables
  >({ query: GetProfileDocument, requestPolicy: "cache-and-network" });

  return (
    <CustomerContext.Provider
      value={{ customerData: data?.getProfile, fetching, error, refetchQuery }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContextProvider = () => {
  const contextData = useContext(CustomerContext);
  if (!contextData) {
    throw new Error(
      "useCustomerContextProvider must be used within a CustomerContextProvider"
    );
  }
  return contextData;
};
