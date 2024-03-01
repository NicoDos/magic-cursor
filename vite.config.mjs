import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import createExternal from "vite-plugin-external";
import { viteExternalsPlugin } from "vite-plugin-externals";
import pkg from "./package.json";

const umdGlobals = {
  react: "React",
  "react-dom": "ReactDOM",
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: path.resolve(".", "lib/index.ts"),
      name: "react-magic-cursor",
      formats: ["es", "cjs", "umd"],
      fileName: (format) =>
        format === "cjs" ? "index.js" : `index.${format}.js`,
      /* deps: {
        registerNodeLoader: false,
      }, */
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
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
    /* createExternal({
      externals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react-jsx-runtime": "ReactJSXRuntime",
      },
    }), */
    /* viteExternalsPlugin(
      {
        react: "React",
        "react-dom": "ReactDOM",
      },
      { useWindow: false }
    ), */
  ],
});
