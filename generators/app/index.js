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
      this.appRoot = this.destinationRoot()
      done()
    })
  }

  writing () {
    const copyer = (paths, sourcePath, destPath) => {
      return paths.forEach(filepath => {
        this.fs.copyTpl(
          this.templatePath(
            `${sourcePath ? `./${sourcePath}/` : './'}${filepath}`
          ),
          this.destinationPath(
            destPath
              ? `${this.appRoot}/${destPath}/${filepath}`
              : `${this.appRoot}/${filepath}`
          ),
          {
            name: this.appName
          }
        )
      })
    }

    this.fs.copyTpl(
      this.templatePath('./_gitignore'),
      this.destinationPath(`${this.appRoot}/.gitignore`)
    )

    this.fs.copyTpl(
      this.templatePath('./_env'),
      this.destinationPath(`${this.appRoot}/.env`)
    )

    copyer(['package.json', 'index.js', 'README.md'], null, null)

    this.spawnCommandSync('create-react-app', [
      'client',
      '--scripts-version',
      'digitalcrafts-react-scripts'
    ])

    // this.installDependencies({
    //   npm: true,
    //   bower: false,
    //   yarn: false
    // })
  }
}
