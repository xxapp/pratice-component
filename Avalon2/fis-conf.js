fis.hook('commonjs', {
    paths: {
        avalon: '/vendor/avalon/avalon.js'
    }
});


fis.unhook('components');
fis.hook('node_modules', {
    ignoreDevDependencies: true,
    shimBuffer: false,
    shimProcess: false
});

fis.match('/{node_modules,components,services}/**/*.js', {
    isMod: true, // 设置 comp 下都是一些组件，组件建议都是匿名方式 define
    release: '/static/$0'
});
fis.match('/{node_modules,components}/**/*.html', {
    release: false
});
fis.match('/services/*.js', {
    isMod: true,
    release: '/static/$0'
});
fis.match('/vendor/**/*.js', {
    isMod: true,
    release: '/static/$0'
});
fis.match('/{README.md,Readme.txt,cmd.cmd,package.json}', {
    release: false
})

fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    })
});