import { CoreTypes } from "./build"

export type PluginArgs = {
  config: CoreTypes.Configuration
}

export default function ProxyflarePagesPluginFunction(
  args: PluginArgs,
): PagesFunction
