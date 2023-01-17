import { spawn } from "child_process"
import fetch from "cross-fetch"
import path from "path"
import semverParse from "semver/functions/parse"

const PROJECT_ROOT = path.resolve(__dirname, "../")

const getVersions = (
  packageType: string,
  packageName: string,
  githubToken: string,
  orgName = "flaregun-net",
): Promise<{ name: string }[]> =>
  fetch(
    `https://api.github.com/orgs/${orgName}/packages/${packageType}/${packageName}/versions`,
    {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken}`,
      },
    },
  ).then((a) => a.json())

const getLastVersion = async () => {
  const versions = await getVersions(
    "npm",
    "proxyflare-core",
    process.env.GITHUB_TOKEN,
  )
  if (!versions.length) {
    throw new Error("no versions found")
  }
  const latestVersion = versions[0].name

  const parsed = semverParse(latestVersion)

  return { isPrerelease: parsed.prerelease.length > 0, version: parsed.version }
}

;(async () => {
  // get latest version of proxyflare-core
  const { version } = await getLastVersion()

  const args = [version, "--ci", `--git.tagName ${version}`]

  console.log(`Publishing with ${args}`)

  const command = spawn("release-it", args, { cwd: PROJECT_ROOT })

  command.stdout.on("data", (data) => {
    console.log(data.toString())
  })

  command.stderr.on("data", (data) => {
    console.log(data.toString())
  })

  command.on("error", (error) => {
    console.log(`error: ${error.message}`)
  })

  command.on("close", (code) => {
    console.log(`child process exited with code ${code}`)
  })
})()
