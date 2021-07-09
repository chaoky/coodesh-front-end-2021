import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import eslint from "vite-plugin-eslint";
import styleImport from "vite-plugin-style-import";
import { antTheme } from "./src/theme";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          ...antTheme,
        },
      },
    },
  },
  plugins: [
    reactRefresh(),
    eslint(),
    styleImport({
      libs: [
        {
          libraryName: "antd",
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
});
