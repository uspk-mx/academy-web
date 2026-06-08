import { createClient } from "@vercel/flags-core";

export const flagsClient = createClient(process.env.DEV_FLAGS_CLIENT_KEY);
