import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  envDir: path.resolve(__dirname, "../.."),
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    external: ["html-react-parser"],
  },
  optimizeDeps: {
    exclude: ["../../packages/graphql/generated"],
  },
  resolve: {
    alias: [
      {
        find: "ui",
        replacement: path.resolve(__dirname, "../../packages/ui"),
      },
    ],
  },
});
