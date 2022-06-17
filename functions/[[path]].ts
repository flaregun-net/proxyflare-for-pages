import { makeBaseContainer } from "@flaregun-net/app-utils"
import type { PluginArgs } from ".."

type ProxyflarePagesPluginFunction<
  Env = unknown,
  Params extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = PagesPluginFunction<Env, Params, Data, PluginArgs>

export const onRequest: ProxyflarePagesPluginFunction = async (context) => {
  const { pluginArgs } = context
  const { config } = pluginArgs
  try {
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
        loggerEndpoint: "https://logger-service.networkchimp.workers.dev",
      },
    )
    // try {
    //   return router(baseContainer, config)
    // } catch (error) {
    //   await baseContainer.logger.alwaysLogText(error)
    // }

    return new Response("hi")
  } catch (error) {
    context.waitUntil(
      fetch("https://logger-service.networkchimp.workers.dev", {
        method: "POST",
        headers: { "content-type": "text/plain" },
        body: `it broke, ${error.emssage} ${error.stack}`,
      }),
    )
  }
}
