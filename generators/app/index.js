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
      this.appRoot = this.destinationRoot(this.appName)
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

    // "axios": "0.18.0",
    // "body-parser": "1.18.3",
    // "express": "4.16.4",
    // "helmet": "3.15.0",
    // "mustache-express": "1.2.8"

    // DEV
    // "nodemon": "1.18.7",
    // "concurrently": "4.1.0",
    // "dotenv": "6.2.0",
    // "create-react-app": "2.1.1"

    const pkgJson = {
      name: this.appName,
      main: 'index.js',
      devDependencies: {
        nodemon: '1.18.7',
        concurrently: '4.1.0',
        dotenv: '6.2.0',
        'create-react-app': '2.1.1'
      },
      dependencies: {
        axios: '0.18.0',
        'body-parser': '1.18.3',
        express: '4.16.4',
        helmet: '3.15.0',
        'mustache-express': '1.2.8'
      },
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
        dev:
          'concurrently --kill-others-on-fail "npm run server" "npm run client"',
        server: 'NODE_ENV=development nodemon --ignore client ./index.js',
        client: 'cd client && npm run start',
        start: 'node index.js'
      }
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)

    this.fs.copyTpl(
      this.templatePath('./_gitignore'),
      this.destinationPath(`${this.appRoot}/.gitignore`)
    )

    this.fs.copyTpl(
      this.templatePath('./_env'),
      this.destinationPath(`${this.appRoot}/.env`)
    )

    copyer(['index.js', 'README.md'], null, null)
  }

  install () {
    console.log('installing project dependencies')
    this.installDependencies({ npm: true, bower: false, yarn: false })
  }

  end () {
    var isDone = this.async()

    this.spawnCommand('create-react-app', [
      'client',
      '--scripts-version',
      'digitalcrafts-react-scripts'
    ])

    console.log('about to initialize create react app')
  }
}
