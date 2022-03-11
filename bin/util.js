import fs from 'fs'
const cwdPath = process.cwd()

/**
 * @returns {Object} package对象
 */
export function getPackageInfo () {
  let pkg = fs.readFileSync(`${cwdPath}/package.json`, 'utf8');
  return JSON.parse(pkg)
}