import type { JpegOptions, PngOptions, WebpOptions, AvifOptions, HeifOptions, JxlOptions, GifOptions, Jp2Options, TiffOptions } from 'sharp'

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
