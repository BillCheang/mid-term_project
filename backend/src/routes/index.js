import express from "express";
import glob from "glob";
//import path from "path"; // 新增 path 模組的匯入

const rootRouter = express.Router();

async function autoloadRoutes() {
  const jsfiles = await glob("**/index.js", {
    cwd: "src/routes",
    ignore: "index.js",
  });
  
  const importTasks = jsfiles.map(async (path) => {
    const module = await import(`./${path}`);
    if (module.default === undefined) return;
    const routePath = path.replace(/\\/g, '/').slice(0, -9); // 修正路徑格式
    rootRouter.use(`/${routePath}`, module.default);
  });
  return Promise.all(importTasks);
}
await autoloadRoutes();

export default rootRouter;