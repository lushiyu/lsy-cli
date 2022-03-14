import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * @returns {Object} package对象
 */
export function getPackageInfo () {
  let pkg = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8');
  return JSON.parse(pkg)
}