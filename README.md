## app H5

## Available Scripts
In the project directory, you can run:

### `npm start`

启动 Node 服务,默认端口号：3000

[HPM] Proxy created: /  ->  http://occtest.ccbpension.com:6010

listeing on port 3000!

### `npm ptf`

> index.js@1.0.0 ptf D:\Product\camp-mobile-h5

> babel pages -d dist

> ptf： ptf 是 pages-to-five  的缩写（阿门...）

目标：使用 `Babel` 转换 `pages` 中的 `Js` 文件，将 `Es6` 转换为 `Es5`

成功：转换成功的 `Es5 Js` 文件会根据 `pages` 中目录自动保存到 `dist` 文件夹相应的目录下
### `npm utf`
> index.js@1.0.0 utf D:\Product\camp-mobile-h5

> babel utils -d util

> utf： utf 是 utils-to-five  的缩写

目标：使用 `Babel` 转换 `utls` 中的 `Js` 文件，将 `Es6` 转换为 `Es5`

成功：转换成功的 `Es5 Js` 文件会根据 `utils` 中目录自动保存到 `util` 文件夹相应的目录下

### `此处重要提示`

此处命令 ( `npm utf` ) 操作主要针对公共文件 ( `utils` ) 有修改，需要转换为 Es5 的 Js 文件。

 一般不进行操作，如果需要进行操作，特别需要注意一个文件：
  
> `aes-js.min.js` 这个文件不进行替换

> `aes-js.min.js` 这个文件不进行替换

> `aes-js.min.js` 这个文件不进行替换

> 重要的事情说三遍！

原因：代码在运行过程中会有很大几率出现错误！
>

## `文件替换`

执行以上命令结束以后，需要进行合并操作。

> 1、将 `dist` 中的文件复制粘贴替换 `pages` 中的文件

> 2、将 util  中的文件复制粘贴替换 `utils` 中的文件

注释：同名文件会自动覆盖替换，上面的1，2 顺序不是必须


