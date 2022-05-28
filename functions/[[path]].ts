import { makeBaseContainer } from "@flaregun-net/app-utils"
import { router } from "@flaregun-net/edgeflare-core"
import type { PluginArgs } from ".."

type EdgeflarePagesPluginFunction<
  Env = unknown,
  Params extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = PagesPluginFunction<Env, Params, Data, PluginArgs>

export const onRequest: EdgeflarePagesPluginFunction = async (context) => {
  const { pluginArgs } = context
  const { siteName, config } = pluginArgs

  const baseContainer = makeBaseContainer(
    {
      request: context.request,
      waitUntil: context.waitUntil,
      passThroughOnException: context.next,
      next: context.next,
    },
    {
      siteName,
      appName: "edgeflare",
    },
  )

  return router(baseContainer, config)
}
