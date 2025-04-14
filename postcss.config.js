module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vx适配的标准屏宽度 iphoneX
      // 设计图如果是 750 调成一倍的  => 适配375标准屏幕
      // 设计图如果是 640 调成一倍的  => 适配320标准屏幕
      viewportWidth: 375
    }
  }
}
