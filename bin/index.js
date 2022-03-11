#!/usr/bin/env node

import program from 'commander'
import inquirer from 'inquirer'
import createProject from './projects.js'
import { addComponent, delComponent } from './components.js'
import { getPackageInfo } from './util.js'

const pkg = getPackageInfo()

program
  .version(pkg.version, '-v, --version')
  .description(pkg.description)

// 新建项目
program
  .command('clone')
  .description('新建项目')
  .action(() => {
    const questions = [{
      type: 'input',
      name: 'name',
      message: "项目名称?",
      default: 'vue3'
    }, {
      type: 'input',
      name: 'author',
      message: "作者?",
      default: ''
    }, {
      type: 'input',
      name: 'version',
      message: "版本号?",
      default: '0.0.1'
    }, {
      type: 'input',
      name: 'description',
      message: "项目描述?",
      default: ''
    }]
    
    inquirer.prompt(questions).then(answers => {
      createProject(answers)
    })
  })

// 组件操作
program
  .command('comps')
  .description('组件操作 type: add|delete')
  .option("--path <path>", "路径")
  .option("--name <name>", "名称")
  .action(async (type, cmd) => {
    if(type === 'add') {
      addComponent(cmd.path, cmd.name)
    } 
    if(type === 'delete') {
      delComponent(cmd.path, cmd.name)
    }
  })

// TODO
program
  .command('new')
  .description('git clone project')
  .action(() => {
    const questions = [{
      type: 'input',
      name: 'project-name',
      message: "项目名称?"
    }, {
      type: 'input',
      name: 'project-writer',
      message: "作者?"
    }, {
      type: 'checkbox',
      name: 'project-type',
      message: "项目插件?",
      choices: [
        { name: 'typescript', checked: true },
        { name: 'element-ui' },
        { name: 'eslint' }
      ]
    }, {
      type: 'list',
      name: 'project-frame',
      message: "框架类型?",
      choices: ['vue', 'react', 'angluar']
    }, {
      type: 'confirm',
      name: 'watch',
      message: '是否使用监听',
      prefix: '前缀'
    }, {
      type: 'confirm',
      name: 'filter',
      message: '是否使用文件过滤',
      suffix: '后缀',
      when: function(answers) {
        console.log(2, answers)
        return answers.watch
      }
    }, {
      type: 'expand',
      name: 'project-bb',
      message: '选择一种水果',
      choices: [
        { key: 'a', name: 'apple', value: 'apple' },
        { key: 'o', name: 'orange', value: 'orange' },
        { key: 'p', name: 'pear', value: 'pear' }
      ]
    }, {
      type: 'rawlist',
      name: 'project-cc',
      message: '选择一种水果',
      choices: ['apple', 'pear', 'banana']
    }]
    
    inquirer.prompt(questions).then(answers => {
      console.log(1, answers)
      // exec('git --version', (error, stdot, stderr) => {
      //   console.log(1, error)
      //   console.log(2, stdot)
      //   console.log(3, stderr)
      //   if (answers['project-name']) {

      //   }
      //   if (answers['project-writer']) {
      //     // https://gitee.com/iamlushiyu/lsy-cli-template.git
      //   }
      // })
    })
  })

program.parse(process.argv)