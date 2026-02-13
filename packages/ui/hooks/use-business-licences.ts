import { useMemo } from "react";
import { useMutation, useQuery } from "urql";
import {
  CompanyInvitesDocument,
  CompanySubscriptionsDocument,
  InviteEmployeesDocument,
  PayCompanySubscriptionDocument,
  RequestSubscriptionCodesDocument,
  ResendInviteDocument,
  SubscriptionPlansDocument,
  SubscriptionReportDocument,
  type CompanySubscription,
  type InviteEmployeesMutation,
  type InviteEmployeesMutationVariables,
  type PayCompanySubscriptionMutation,
  type PayCompanySubscriptionMutationVariables,
  type RequestSubscriptionCodesMutation,
  type RequestSubscriptionCodesMutationVariables,
  type ResendInviteMutation,
} from "gql-generated/gql/graphql";
import type { ResendInviteMutationVariables } from "gql-generated/generated/types";

export function useSubscriptionPlans() {
  const [res, reexecute] = useQuery({ query: SubscriptionPlansDocument });
  return {
    ...res,
    refresh: () => reexecute({ requestPolicy: "network-only" }),
  };
}

export function useCompanySubscriptions(companyId?: string) {
  const [res, reexecute] = useQuery({
    query: CompanySubscriptionsDocument,
    variables: { companyId: companyId ?? "" },
    pause: !companyId,
  });
  return {
    ...res,
    refresh: () => reexecute({ requestPolicy: "network-only" }),
  };
}

export function useSubscriptionReport(
  companyId?: string,
  companySubscriptionId?: string
) {
  const pause = !companyId || !companySubscriptionId;
  const [res, reexecute] = useQuery({
    query: SubscriptionReportDocument,
    variables: {
      companyId: companyId ?? "",
      companySubscriptionId: companySubscriptionId ?? "",
    },
    pause,
  });
  return {
    ...res,
    refresh: () => reexecute({ requestPolicy: "network-only" }),
  };
}

export function useCompanyInvites(companySubscriptionId?: string) {
  const [res, reexecute] = useQuery({
    query: CompanyInvitesDocument,
    variables: { companySubscriptionId: companySubscriptionId ?? "" },
    pause: !companySubscriptionId,
  });
  return {
    ...res,
    refresh: () => reexecute({ requestPolicy: "network-only" }),
  };
}

export function useRequestSubscriptionCodes() {
  const [res, exec] = useMutation<
    RequestSubscriptionCodesMutation,
    RequestSubscriptionCodesMutationVariables
  >(RequestSubscriptionCodesDocument);
  return { ...res, request: exec };
}

export function useInviteEmployees() {
  const [res, exec] = useMutation<
    InviteEmployeesMutation,
    InviteEmployeesMutationVariables
  >(InviteEmployeesDocument);
  return { ...res, invite: exec };
}

export function useResendInvite() {
  const [res, exec] = useMutation<
    ResendInviteMutation,
    ResendInviteMutationVariables
  >(ResendInviteDocument);
  return { ...res, resend: exec };
}

export function usePayCompanySubscription() {
  const [res, exec] = useMutation<
    PayCompanySubscriptionMutation,
    PayCompanySubscriptionMutationVariables
  >(PayCompanySubscriptionDocument);
  return { ...res, pay: exec };
}

export function usePaidOrdersOnly(
  companySubscriptions: CompanySubscription[] | undefined
) {
  return useMemo(() => {
    return (companySubscriptions ?? []).filter((o) => o.status === "paid");
  }, [companySubscriptions]);
}
