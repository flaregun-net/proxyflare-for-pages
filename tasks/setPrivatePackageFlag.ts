import fs from "fs"
import path from "path"

const getProjectPackage = (projectDir = process.cwd()) =>
  JSON.parse(fs.readFileSync(path.join(projectDir, "package.json")).toString())

const setProjectPackage = (contents, projectDir = process.cwd()) =>
  fs.writeFileSync(
    path.join(projectDir, "package.json"),
    JSON.stringify(contents, null, 2) + "\n",
  )

const init = () => {
  const flag = process.argv[2]

  const contents = getProjectPackage()

  if (flag === "--off") {
    delete contents.private
  } else {
    contents.private = true
  }

  setProjectPackage(contents)
}

init()
