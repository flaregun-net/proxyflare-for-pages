import del from "del"
import { cp } from "fs/promises"
import path from "path"

;(() =>
  Promise.all(
    ["build/index.d.ts", "build/types"].map((pathname) =>
      cp(
        path.join(
          process.cwd(),
          `node_modules/@flaregun-net/proxyflare-core/${pathname}`,
        ),
        path.join(process.cwd(), pathname),
        { recursive: true },
      ),
    ),
  ).then(() =>
    ["build/types/schema*.ts", "build/types/core.d.ts"].map((pathname) =>
      del(path.join(process.cwd(), pathname)),
    ),
  ))()
