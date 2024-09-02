
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import sharp, { FormatEnum } from 'sharp'
import type { Sharp } from 'sharp'
import type { Compilation, Compiler } from 'webpack'
import type { JpegOptions, PngOptions, WebpOptions, AvifOptions, HeifOptions, JxlOptions, GifOptions, Jp2Options, TiffOptions } from 'sharp'

const RED = '\x1b[31m%s\x1b[0m'; // 控制台颜色
const GREEN = '\x1b[32m%s\x1b[0m';// 控制台颜色

const pluginName = 'plugin-image-convert'

const unitConvert = (size: number): string => {
    return `${Math.floor(size / 1024)} KB`
}

export type SharpOutputOption = {
    jpeg?: JpegOptions;
    png?: PngOptions;
    webp?: WebpOptions;
    avif?: AvifOptions;
    heif?: HeifOptions;
    jxl?: JxlOptions;
    gif?: GifOptions;
    Jp2?: Jp2Options;
    tiff?: TiffOptions
};


export interface Options {
    // define your plugin options here
    test: RegExp,
    encodeOptions: SharpOutputOption
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => {

    const generator = options || {
        test: /\.(jpe?g|png)$/,
        encodeOptions: {
            webp: {
                //   https://sharp.pixelplumbing.com/api-output#webp
            },
            avif: {
                //   https://sharp.pixelplumbing.com/api-output#avif
            }
        }

    }

    function emitAsset(name: string, buffer: Buffer, compilation: Compilation) {
        if (compilation.emitAsset) {
            // webpack 5.x
            compilation.emitAsset(name, {
                source: () => buffer,
                size: () => buffer.length
            } as any)
        } else {
            // webpack 4.x & 3.x
            compilation.assets[name] = {
                source: () => buffer,
                size: () => buffer.length
            } as any;
        }
    }

    const onEmit = (compilation: Compilation, cb: any) => {
        const imgReg = generator.test || /\.(jpe?g|png)$/;
        let assetNames = Object.keys(compilation.assets);
        let nrOfImagesFailed = 0; // 文件转换失败数量
        const promises = []
        for (let index = 0; index < assetNames.length; index++) {
            const name = assetNames[index];
            if (imgReg.test(name)) {
                const currentAsset = compilation.assets[name];
                const sharpStream: Sharp = sharp(currentAsset.source());
                const encodeOptions: any = generator.encodeOptions
                for (const key in encodeOptions) {
                    promises.push(new Promise(async (resolve, reject) => {
                        try {
                            const buffer: Buffer = await sharpStream.clone().toFormat(key as keyof FormatEnum, encodeOptions[key]).toBuffer()
                            resolve({
                                name: `${name}.${key}`,
                                originName: name,
                                buffer,
                                originSize: currentAsset.size()
                            })
                        } catch (error) {
                            nrOfImagesFailed++
                            reject({
                                name
                            })
                        }
                    }))
                }
            }
        }
        Promise.all(promises).then((dataArr: any[]) => {
            for (let index = 0; index < dataArr.length; index++) {
                const { name, buffer, originName, originSize } = dataArr[index];
                console.log(GREEN, `${pluginName}: ${originName}[${unitConvert(originSize)}] => ${name}[${unitConvert(buffer.length)}]`);
                emitAsset(`${name}`, buffer, compilation)
            }
            cb();
        }).catch(error => {
            console.log(RED, `${pluginName}: ${nrOfImagesFailed} images failed to convert to webp`);
            for (let index = 0; index < error.length; index++) {
                const element = error[index];
                console.log(RED, `${pluginName}: ${element.name}  failed to convert to webp`);
            }
        })
    }


    return {
        name: pluginName,
        enforce: 'post',
        vite: {
            async generateBundle(opt: any) {
                const { bundle } = opt
                for (const key in bundle) {
                    const imgReg = generator.test || /\.(jpe?g|png)$/;
                    if (imgReg.test(key)) {
                        const { source, fileName } = bundle[key]
                        const sharpStream = sharp(source);
                        const encodeOptions: any = generator.encodeOptions
                        for (const key in encodeOptions) {
                            const newBuffer = await sharpStream.clone().toFormat(key as keyof FormatEnum, encodeOptions[key]).toBuffer()
                            this.emitFile({
                                type: 'asset',
                                fileName: `${fileName}.${key}`,
                                source: newBuffer
                            })
                        }
                    }
                }
            }
        },
        webpack(compiler: Compiler) {
            if (compiler.hooks && compiler.hooks.thisCompilation) {
                // webpack 5.x
                compiler.hooks.thisCompilation.tap(pluginName, compilation => {
                    compilation.hooks.processAssets.tapAsync({
                        name: pluginName,
                        stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
                    }, (assets, cb) => {
                        onEmit(compilation, cb)
                    });
                })
            }
            else if (compiler.hooks) {
                // webpack 4.x
                compiler.hooks.emit.tapAsync(pluginName, onEmit);
            } else {
                // older versions
                (compiler as Compiler & { plugin: any }).plugin('emit', onEmit);
            }
        }
    }
}


const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export const webpackImageConvert = unplugin.webpack
export const viteImageConvert = unplugin.vite


