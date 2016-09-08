fis.hook('commonjs', {
    extList: ['.js']
});

fis.unhook('components'); 
fis.hook('node_modules');

// 设置成是模块化 js, 编译后会被 define 包裹。
fis.match('/{node_modules,components}/**.js', {
  isMod: true
});

fis.match('::package', {
  // 本项目为纯前段项目，所以用 loader 编译期加载，
  // 如果用后端运行时框架，请不要使用。
  postpackager: fis.plugin('loader', {
    useInlineMap: true
  })
});