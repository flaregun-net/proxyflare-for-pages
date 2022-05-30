import del from "del"
import { cp } from "fs/promises"
import path from "path"
;(() =>
  cp(
    path.join(
      process.cwd(),
      "node_modules/@flaregun-net/proxyflare-core/build",
    ),
    path.join(process.cwd(), "build"),
    { recursive: true },
  ).then(() =>
    del([
      path.join(process.cwd(), "build/*.js"),
      path.join(process.cwd(), "build/harness"),
      path.join(process.cwd(), "build/handlers.d.ts"),
    ]),
  ))()
