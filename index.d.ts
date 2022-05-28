import { CoreTypes } from "./build"

export type PluginArgs = {
  config: CoreTypes.RawConfiguration
}

export default function EdgeflarePagesPluginFunction(
  args: PluginArgs,
): PagesFunction
