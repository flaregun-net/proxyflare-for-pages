import { CoreTypes } from "./build"

export type PluginArgs = {
  config: CoreTypes.RawConfiguration
}

export default function ProxyflarePagesPluginFunction(
  args: PluginArgs,
): PagesFunction
