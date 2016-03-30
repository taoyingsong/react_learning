源码参见：https://github.com/piliyu/react-getting-started <br />
运行步骤：<br />
1、控制台运行：npm init (一路回车，license 改为MIT), 最后yes <br />
2、控制台运行：npm install --save browser-sync <br />

3、在package.json中添加监听所有文件的配置:
  "scripts": {
    "dev": "browser-sync start --server --files \"*.*\""
  },
<br />
4、控制台运行：npm run dev <br />
