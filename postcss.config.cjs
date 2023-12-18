module.exports = ctx => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    autoprefixer: {},
    // 'postcss-pxtorem': {
    //   rootValue: 192, // 设计稿宽度的1/10
    //   unitPrecision: 5,
    //   propList: ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    //   selectorBlackList: [],
    //   replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 0,
    //   exclude: /node_modules/i,
    // },
  },
})
