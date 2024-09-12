
# ✨ unplugin-image-convert

## 📦 Install

```bash
npm add @yuanjianming/unplugin-image-convert -D
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

|  option   | type  | default | describe |
|  ----  | ----  | ---- | ---- |
| `test`  | `RegExp` | '' | Regular expression for image resource file path
| `encodeOptions`  | `SharpOutputOption` | `webp:{},avif:{}` | Support format conversion for `jpeg`, `png`, `webp`, `avif`, `heif`, `jxl`, `gif`, `Jp2`, and `tif`


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



