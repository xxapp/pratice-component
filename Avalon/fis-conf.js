// npm install [-g] fis3-hook-commonjs
fis.hook('commonjs', {
    paths: {
        avalon: '/vendor/avalon/avalon.js',
        mmState: '/vendor/mmState/mmState.js',
        jquery: '/vendor/jquery/jquery.js'
    }
});

fis.set('baseurl', '/test');
fis.set('local_server', 'http://127.0.0.1:7070/cargotmall/');
fis.set('remote_server', 'http://127.0.0.1:7070/cargotmall/');
fis.set('local_api', 'http://127.0.0.1:7070/cargotmall/api');
fis.set('remote_api', 'http://127.0.0.1:7070/cargotmall/api');
fis.set('local_springapi', 'http://127.0.0.1:7070/cargotmall/home/');
fis.set('remote_springapi', 'http://127.0.0.1:7070/cargotmall/home/');


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
fis.match('/services/*.js', {
    postprocessor: function (content, file, settings) {
        return content
            .replace('__API_URL__', fis.get('local_api'))
            .replace('__SPRING_API_URL__', fis.get('local_springapi'));
    }
});
fis.match('/static/ueditor/ueditor.config.js', {
    postprocessor: function (content, file, settings) {
        return content
            .replace('__SERVER_URL__', fis.get('local_server'));
    }
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
})

// fis3 release prod 产品发布，进行合并
fis.media('prod')
    // .match('*.js', {
    //     packTo: '/static/aio.js'
    // })
    // .match('/static/mod.js', {
    //     packOrder: -100
    // });
    .match('/static/**', {
        url: '${baseurl}/$0'
    })
    .match('/{node_modules,components,services}/**/*.js', {
        url: '${baseurl}/static/$0'
    })
    .match('/services/*.js', {
        url: '${baseurl}/static/$0'
    })
    .match('/services/*.js', {
        postprocessor: function (content, file, settings) {
            return content
                .replace('__API_URL__', fis.get('remote_api'))
                .replace('__SPRING_API_URL__', fis.get('remote_springapi'));
        }
    })
    .match('/static/ueditor/ueditor.config.js', {
        postprocessor: function (content, file, settings) {
            return content
                .replace('__SERVER_URL__', fis.get('remote_server'));
        }
    })
    .match('/vendor/**/*.js', {
        url: '${baseurl}/static/$0'
    })
    .match('*', {
        deploy: fis.plugin('http-push', {
            receiver: 'http://121.40.216.238:8083/receiver.php',
            to: 'C:/Program Files/Apache Software Foundation/Tomcat 9.0/webapps/test'
        })
    });