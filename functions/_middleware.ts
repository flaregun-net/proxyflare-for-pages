import { makeBaseContainer } from "@flaregun-net/app-utils"
import { router } from "@flaregun-net/proxyflare-core"
import type { PluginArgs } from ".."

type ProxyflarePagesPluginFunction<
  Env = unknown,
  Params extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = PagesPluginFunction<Env, Params, Data, PluginArgs>

export const onRequest: ProxyflarePagesPluginFunction = async (context) => {
  const { pluginArgs } = context
  const { config } = pluginArgs

  const baseContainer = makeBaseContainer(
    {
      request: context.request,
      waitUntil: context.waitUntil,
      passThroughOnException: context.next,
      next: context.next,
    },
    {
      isDev: false,
      appName: "proxyflare",
      loggerEndpoint: null,
    },
  )

  try {
    return router(baseContainer, config)
  } catch (error) {
    return baseContainer.passThroughOnException() as unknown as ReturnType<
      typeof context.next
    >
  }
}
