import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'

// 部署在 GitHub Pages 用户站（xzdhstl.github.io），服务在根路径 '/'。
// 采用 SPA 模式：产出单页 index.html + 客户端路由，GitHub Pages 用 404.html 兜底。
const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    contentCollections(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
        // 低并发更稳；过滤掉 #hash 锚点（同一页面的锚点无需单独预渲染）
        concurrency: 1,
        filter: ({ path }) => !path.includes('#'),
      },
    }),
    viteReact(),
  ],
})

export default config
