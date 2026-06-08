import { createClient } from "@vercel/flags-core";

const clientCreds =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_FLAGS_CLIENT_KEY
    : process.env.DEV_FLAGS_CLIENT_KEY;

export const flagsClient = createClient(clientCreds);
