import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/',
  build: {
    assetsInclude: ['**/*.json'],
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // 对于books目录下的JSON文件保持原始路径结构
          if (assetInfo.name && assetInfo.name.includes('/books/')) {
            return assetInfo.name.replace('src/resources', '');
          }
          // 其他资源使用哈希命名
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // 明确配置public目录结构
    assetsDir: 'assets',
    publicDir: 'public'
  }
}));
