'use strict'
// Require dependencies
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const mkdirp = require('mkdirp')

module.exports = class extends Generator {
  prompting () {
    var done = this.async()
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }).then(answers => {
      this.appName = answers.name
      this.appRoot = `${this.destinationRoot()}/${this.appName}`

      done()
    })
  }

  writing () {
    var paths = ['package.json', '.gitignore', '.env', 'index.js', 'README.md']
    paths.forEach(filepath => {
      this.fs.copyTpl(
        this.templatePath(filepath),
        this.destinationPath(`${this.appRoot}/${filepath}`),
        {
          name: this.appName
        }
      )
    })

    this.destinationRoot(`${this.appRoot}`)

    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    })
  }
}
