import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";
import path from "path";

const config: CodegenConfig = {
  schema: path.resolve(__dirname, "./schema.academy.graphql"),
  documents: ["./general.fragments.graphql", "./src/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
        persistedDocuments: true,
      },
      documentTransforms: [addTypenameSelectionDocumentTransform],
      config: {
        useTypeImports: true,
      },
    },
    "./generated/msw.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-msw"],
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
