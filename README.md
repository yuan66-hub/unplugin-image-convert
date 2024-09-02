
## 安装

```bash
npm add @yuanjianming/unplugin-image-convert
```

## 基本使用

```js
import { defineConfig } from 'vite'
import { webpackImageConvert } from '@yuanjianming/unplugin-image-convert'
export default defineConfig({
    //....
    plugins: [webpackImageConvert({
         test:/\.(jpe?g|png)$/,
         encodeOptions:{
              webp:{
                //   https://sharp.pixelplumbing.com/api-output#webp
              },
              avif:{
                  //   https://sharp.pixelplumbing.com/api-output#avif
              }
         }
    })],
})
```


## 基础选项

|  参数   | 类型  | 默认 | 描述 |
|  ----  | ----  | ---- | ---- |
| `test`  | `RegExp` | `/\.(jpe?g|png)$/` | 监听文件的绝对路径
| `encodeOptions`  | `SharpOutputOption` | `webp:{},avif:{}` | 支持`jpeg`,`png`,`webp`,`avif`,`heif`,`jxl`,`gif`,`Jp2`,`tiff`格式转换




