import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  envDir: path.resolve(__dirname, "../.."),
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    rollupOptions: {
      external: ["jsdom", "cssstyle", /^jsdom\//, /^cssstyle\//],
    },
  },
  optimizeDeps: {
    exclude: ["jsdom", "cssstyle", "../../packages/graphql/generated"],
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
