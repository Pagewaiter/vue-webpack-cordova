#!/usr/bin/env node

module.exports = function (context) {

  // https://github.com/shelljs/shelljs
  require('./check-versions')()
  require('shelljs/global')
  Q = context.requireCordovaModule('q'),
  env.NODE_ENV = 'production'

  var deferral = new Q.defer()
  var path = require('path')
  var config = require('../config')
  var ora = require('ora')
  var webpack = require('webpack')
  var webpackConfig = require('./webpack.prod.conf')

  console.log(
    '  Tip:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  )

  var spinner = ora('building for production...')
  spinner.start()

  var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
  rm('-rf', assetsPath)
  mkdir('-p', assetsPath)
  cp('-R', 'static/*', assetsPath)

  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
    deferral.resolve()
  })

  return deferral.promise
}