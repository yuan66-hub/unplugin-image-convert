
# ✨ unplugin-image-convert

## 📦 Install

```bash
npm add @yuanjianming/unplugin-image-convert
```

## 💪 Basic Use

- vite.config.js

```js
import { defineConfig } from 'vite'
import { viteImageConvert } from '@yuanjianming/unplugin-image-convert'
export default defineConfig({
    //....
    plugins: [viteImageConvert({
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

- webpack.config.js

```js
const { webpackImageConvert } =require('@yuanjianming/unplugin-image-convert')

module.exports ={
    plugins:[
        webpackImageConvert({
                test:/\.(jpe?g|png)$/,
                encodeOptions:{
                    webp:{
                        //   https://sharp.pixelplumbing.com/api-output#webp
                    },
                    avif:{
                        //   https://sharp.pixelplumbing.com/api-output#avif
                    }
                }
        })
    ]
}

```



##  👨‍💻 Config

|  参数   | 类型  | 默认 | 描述 |
|  ----  | ----  | ---- | ---- |
| `test`  | `RegExp` | '' | 监听文件的绝对路径
| `encodeOptions`  | `SharpOutputOption` | `webp:{},avif:{}` | 支持`jpeg`,`png`,`webp`,`avif`,`heif`,`jxl`,`gif`,`Jp2`,`tiff`格式转换


## 💪 Default Config

```js
{
                test:/\.(jpe?g|png)$/,
                encodeOptions:{
                    webp:{
                        //   https://sharp.pixelplumbing.com/api-output#webp
                    },
                    avif:{
                        //   https://sharp.pixelplumbing.com/api-output#avif
                    }
                }
}
```



