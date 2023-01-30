import { spawn } from "child_process"
import del from "del"
import { cp } from "fs/promises"
import path from "path"

const buildCore: () => Promise<{ coreRoot: string; coreFile: string }> = () =>
  new Promise((resolve, reject) => {
    try {
      if (process.env.GITHUB_ACTIONS) {
        const child = spawn(
          "npm",
          ["install", "@flaregun-net/proxyflare-core"],
          {
            env: process.env,
          },
        )

        child.on("close", () => {
          resolve({
            coreRoot: "./node_modules/@flaregun-net/proxyflare-core",
            coreFile: "./build/index.js",
          })
        })

        return
      }

      const coreRoot = path.join(process.cwd(), "../proxyflare-core")

      const child = spawn("npm", ["run", "build"], {
        cwd: coreRoot,
        env: {
          ...process.env,
          NODE_ENV: "production",
        },
      })

      child.on("close", () => {
        resolve({
          coreRoot,
          coreFile: "./build/index.js",
        })
      })
    } catch (error) {
      reject(error)
    }
  })

;(() =>
  buildCore().then(({ coreRoot, coreFile }) =>
    Promise.all(
      ["build/types", "build/index.d.ts", [coreFile, "build/core.js"]].map(
        (paths) => {
          const [from, to] = Array.isArray(paths)
            ? [paths[0], paths[1]]
            : [paths, paths]

          return cp(path.join(coreRoot, from), path.join(process.cwd(), to), {
            recursive: true,
          })
        },
      ),
    ).then(() =>
      ["build/types/schema*.ts", "build/types/core.d.ts"].map((pathname) =>
        del(path.join(process.cwd(), pathname)),
      ),
    ),
  ))()
