import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(".", "lib/index.ts"),
      name: "react-magic-cursor",
      formats: ["es", "cjs", "umd"],
      fileName: (format) =>
        format === "cjs" ? "index.js" : `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        banner: "'use client';",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    dts({ rollupTypes: true }),
    tsconfigPaths(),
  ],
});
