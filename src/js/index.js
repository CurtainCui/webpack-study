// css-loader! 表示用css-loader去解析

//const css = require("css-loader!../css/index.css"); // 当成模块去解析 --- 生成 bundle.js
//const css = import("css-loader!../css/index.css"); // 动态加载 --- 生成 0.bundle.js

const css = require("../css/index.css"); // ----- 链式调用

const a = '----------------------->';
console.log(a, css);
