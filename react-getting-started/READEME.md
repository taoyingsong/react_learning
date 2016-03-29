源码参见：https://github.com/piliyu/react-getting-started <br />
运行步骤：<br />
1、控制台运行：npm install --save browser-sync <br />

2、在package.json中添加监听所有文件的配置:
  "scripts": {
    "dev": "browser-sync start --server --files \"*.*\""
  },
<br />
3、控制台运行：npm run dev <br />
