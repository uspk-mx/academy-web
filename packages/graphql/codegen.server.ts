import type { CodegenConfig } from "@graphql-codegen/cli";
import path from "node:path";

const config: CodegenConfig = {
  schema: path.resolve(__dirname, "./schema.academy.graphql"),
  documents: ["./general.fragments.graphql", "./src/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./generated/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
    "./generated/bff.sdk.ts": {
      plugins: [
        { add: { content: "import type * as Types from './types';" } },
        "typescript-graphql-request",
      ],
      config: {
        typesPrefix: "Types.",
        useTypeImports: true,
      },
    },
  },
};

export default config;
