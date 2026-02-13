import { useQuery } from "urql";
import type { MeQuery, MeQueryVariables } from "gql-generated/generated/types";
import { MeDocument } from "gql-generated/gql/graphql";

export function useCompanyId(): string {
  const [{ data }] = useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    requestPolicy: "cache-and-network",
  });
  return data?.me?.company?.id ?? "";
}
