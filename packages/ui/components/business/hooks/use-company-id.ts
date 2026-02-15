import {
  GetProfileDocument,
  type GetProfileQuery,
  type GetProfileQueryVariables,
} from "gql-generated/gql/graphql";
import { useQuery } from "urql";

export function useCompanyId(): string {
  const [{ data }] = useQuery<GetProfileQuery, GetProfileQueryVariables>({
    query: GetProfileDocument,
    requestPolicy: "cache-and-network",
  });
  return data?.getProfile?.company?.id ?? "";
}
