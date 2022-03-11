
import fs from 'fs'
import path from 'path'
import ora from 'ora'
import chalk from 'chalk'
import shell from 'shelljs'

const cwdPath = process.cwd();
const TPL_COMPONENT_PATH = path.normalize(`${cwdPath}/tpl/component`)

// 组件是否存在
const isExisted = (componentPath) => {
  if(fs.existsSync(componentPath)) {
    return true
  }
  return false
}

export function addComponent (componentPath, componentName) {
  const outputComponentDirPath = path.normalize(`${cwdPath}${componentPath}`)
  const outputComponentPath = `${outputComponentDirPath}/${componentName}`

  // 判断组件是否存在
  if(isExisted(outputComponentPath)) {
    console.log(chalk.red('error: 当前component已存在, 请删除后重新执行'))
    return
  }

  // 等待中效果
  const oraSpiner = ora().start()

  // 创建组件文件夹
  fs.mkdirSync(`${outputComponentDirPath}/${componentName}`)
  // 读取tpl组件信息
  try {
    fs.readdirSync(TPL_COMPONENT_PATH).forEach(fileName => {
      // 修改组件信息
      let data = fs.readFileSync(path.join(TPL_COMPONENT_PATH, fileName), 'utf8')
      data = data.replace(/__components_path__/g, `${componentPath}/${componentName}`)
      data = data.replace(/__components_name__/g, componentName)
      // 写入目标目录
      fs.writeFileSync(path.normalize(`${outputComponentPath}/${fileName}`), data)
    })
  } catch(err) {
    console.log(err)
  }
  oraSpiner.succeed(`component: ${componentName} 创建完毕`).stop()
}

export function delComponent (componentPath, componentName) {
  const outputComponentDirPath = path.normalize(`${cwdPath}${componentPath}`)
  const outputComponentPath = `${outputComponentDirPath}/${componentName}`
  // 判断组件是否存在
  if(!isExisted(outputComponentPath)) {
    console.log(chalk.red('error: 当前component不存在, 请检查路径'))
    return
  }
  // 删除目标文件
  shell.rm('-rf', outputComponentPath)
}