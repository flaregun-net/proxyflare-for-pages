import { makeBaseContainer } from "@flaregun-net/app-utils"
import { router } from "@flaregun-net/proxyflare-core"
import type { PluginArgs } from ".."
import {
  handleRedirect,
  handleRequest,
  handleResources,
  matcher,
} from "../../proxyflare-core/src/internals/plugin"

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
      isDev: true,
      appName: "proxyflare",
      // ensure we don't add loggerEndpoint here
      loggerEndpoint: null,
    },
  )

  try {
    return router(baseContainer, {
      matcher,
      handlers: {
        request: handleRequest,
        redirect: handleRedirect,
        resource: handleResources,
      },
    })
  } catch (error) {
    // make sure to add
    return baseContainer.passThroughOnException() as unknown as ReturnType<
      typeof context.next
    >
  }
}
