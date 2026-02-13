import { getSdk, type Sdk } from "gql-generated/gql/graphql";
import { getSdkContext } from "./sdk/sdk";

export const { sdkServer } = getSdkContext<Sdk>(getSdk);
