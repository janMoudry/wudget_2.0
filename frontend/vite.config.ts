import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import path from "path";

type Mode = "dev" | "prod" | undefined;
// Load .env files based on the mode
function loadEnv(mode: string) {
  const envFiles = {
    dev: ".dev.env",
    prod: ".prod.env",
  };

  const envFilePath = path.resolve(
    __dirname,
    `./env/${envFiles[(mode as Mode) ?? "dev"]}`
  );
  dotenv.config({ path: envFilePath });
}

export default defineConfig(({ mode }) => {
  loadEnv(mode);

  return {
    plugins: [react()],
    define: {
      "process.env": process.env,
    },
    resolve: {
      alias: {
        "@enums": path.resolve(__dirname, "src/enums"),
        "@locale": path.resolve(__dirname, "src/locale"),
        "@providers": path.resolve(__dirname, "src/providers"),
        "@types": path.resolve(__dirname, "src/types"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@navigation": path.resolve(__dirname, "src/navigation"),
        "@components": path.resolve(__dirname, "src/components"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@api": path.resolve(__dirname, "src/api"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
  };
});
