
const pkg  = require('./package.json' )
const typescript =require('rollup-plugin-typescript2')
const commonjs = require('@rollup/plugin-commonjs')

module.exports = {
    input: './src/index.ts',
    external:['sharp','unplugin'],
    // 出口。属性值可以是一个对象类型的数组，将会输出多个结果；也可以是一个对象，只输出一个结果
    output: [
        {
            format: 'cjs',
            // 一旦导出为 cjs 格式，就必须指定 name 名称
            name: pkg.name,
            file: 'dist/index.cjs',
        },
        {
            format: 'es',
            // 一旦导出为 UMD 格式，就必须指定 name 名称
            name: pkg.name,
            file: 'dist/index.mjs',
           
        },
    ],
    plugins:[
        commonjs(),
        typescript()
    ]
}