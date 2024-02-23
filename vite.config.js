import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(".", "src/index.tsx"),
      name: "react-magic-cursor",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [
    dts({
      include: ["src/typings/index.ts"],
    }),
    tsconfigPaths(),
    react(),
  ],
});
