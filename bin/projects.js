import ora from 'ora'
import shell from 'shelljs'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

const cwdPath = process.cwd()

// 是否已有项目存在
const projectIsExisted = () => {
  if (fs.existsSync(`${cwdPath}/package.json`)) {
    return true
  }
  return false
}

export default function createProject ({name, author, version, description}) {
  if (projectIsExisted()) {
    console.log(chalk.red('error: 创建失败，当前目录已存在项目，可以先清空后创建'))
    return
  }

  // 等待中效果
  const oraSpiner = ora().start()

  const child = shell.exec('git clone https://gitee.com/iamlushiyu/lsy-cli-template.git', {
    async: true
  }, (code) => {
    if (code === 0) {
      try {
        // 移动项目内的目录和文件
        const moveList = fs.readdirSync(`${cwdPath}/lsy-cli-template`).map(item => {
          return `${cwdPath}/lsy-cli-template/${item}`
        })
        shell.mv(moveList, cwdPath)

        // 删除克隆的目录
        const rmdir = path.normalize(`${cwdPath}/lsy-cli-template`)
        shell.rm('-rf', rmdir)
        
        // 删除.git克隆仓库文件
        const rmGitDir = path.normalize(`${cwdPath}/.git`)
        shell.rm('-rf', rmGitDir)

        // 修改REAMDME.md
        let readmeText = fs.readFileSync(`${cwdPath}/README.md`, 'utf8');
        const reg = new RegExp('项目名称', 'mg');
        readmeText = readmeText.replace(reg, name)
        fs.writeFileSync(`${cwdPath}/README.md`, readmeText, 'utf8');

        // 修改package
        let packageText = fs.readFileSync(`${cwdPath}/package.json`, 'utf8')
        const nameReg = new RegExp('project-name', 'mg')
        const authorReg = new RegExp('project-author', 'mg')
        const versionReg = new RegExp('project-version', 'mg')
        const descReg = new RegExp('project-description', 'mg')
        packageText = packageText.replace(nameReg, name)
        packageText = packageText.replace(authorReg, author)
        packageText = packageText.replace(versionReg, version)
        packageText = packageText.replace(descReg, description)
        fs.writeFileSync(`${cwdPath}/package.json`, packageText, 'utf8')
      } catch (err) {
        console.log(err)
      }

      oraSpiner.succeed('创建完毕').stop()
    }
  })

  // 监听克隆信息
  child.stdout.on('data', data => {
    console.log(data)
  })
}