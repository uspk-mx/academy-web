import { instantiate, type Factory } from "../graphql-utils/client/configurator";


type Sdk = Record<
	string,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	(variables: any, requestHeaders?: RequestInit['headers']) => Promise<any>
>;

export function getSdkContext<T extends Sdk>(factory: Factory<T>) {
  return {
    sdkServer: instantiate(factory),
  };
}
