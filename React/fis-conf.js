fis.hook('commonjs', {
    extList: ['.js', '.jsx']
});

// 让 modules 目录下面的 js 和 jsx 通过 typescript
fis.match('{/modules/**.js,*.jsx}', {
  // 要支持 es6 和 jsx， typescript 也能胜任，最主要是编译速度要快很多。
  parser: fis.plugin('typescript'),

  // typescript 就是编译速度会很快，但是对一些 es7 的语法不支持，如果你觉得不爽，可以用 babel 来解决。用以下内容换掉 typescript 的parser配置就好了。
  // parser: fis.plugin('babel-5.x', {
  //     sourceMaps: true,
  //     optional: ["es7.decorators", "es7.classProperties"]
  // }),
  rExt: '.js'
});

fis.unhook('components'); // fis3 中预设的是 fis-components，这里不需要，所以先关了。
fis.hook('node_modules'); // 使用 fis3-hook-node_modules 插件。

// 设置成是模块化 js, 编译后会被 define 包裹。
fis.match('/{node_modules,modules}/**.{js,jsx}', {
  isMod: true
});

fis.match('::package', {
  // 本项目为纯前段项目，所以用 loader 编译期加载，
  // 如果用后端运行时框架，请不要使用。
  postpackager: fis.plugin('loader', {
    useInlineMap: true
  })
});