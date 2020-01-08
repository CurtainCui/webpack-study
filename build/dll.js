/**
 * wp-6.js 
 * webpack config demo
 * DllPlugin 是将第三方长期不变的包与实际项目隔离开来并分别打包，当我们 build 时再将已经打包好的 dll 包引进来就 ok 了
 */

module.exports = options => {
  const path = require("path");
  const dllPath = path.join(process.cwd(), "dll");
  const Config = require("webpack-chain");
  const config = new Config();
  const webpack = require("webpack");
  const rimraf = require("rimraf");
  const ora = require("ora");
  const chalk = require("chalk");
  const BundleAnalyzerPlugin = require("../config/BundleAnalyzerPlugin")(config);
  
  BundleAnalyzerPlugin();
  config
    .entry("dll")
    .add("vue")
    .add("react")
    .end()
    .set("mode", "production")
    .output.path(dllPath)
    .filename("[name].js")
    .library("[name]")
    .end()
    .plugin("DllPlugin")
    .use(webpack.DllPlugin, [
      {
        name: "[name]",
        path: path.join(process.cwd(), "dll", "manifest.json")
      }
    ])
    .end();
  
  rimraf.sync(path.join(process.cwd(), "dll"));
  const spinner = ora("开始构建项目dll  (￣▽￣)~*' ");
  spinner.start();
  
  webpack(config.toConfig(), function(err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + "\n\n"
    );
  
    if (stats.hasErrors()) {
      console.log(chalk.red("构建失败   ┭┮﹏┭┮'\n"));
      process.exit(1);
    }
    console.log(chalk.cyan("build完成  (￣▽￣)~*'\n"));
  });
} 

