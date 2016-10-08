var avalon = require('avalon');

avalon.component('ms-container', {
    template: '<div><slot name="content" /></div>',
    defaults: {}
});
avalon.component('ms-button', {
    template: '<button ms-click="@go">{{@text}}</button>',
    defaults: {
        text: 'Click Me',
        go: function () {
            alert('didimermer');
        }
    }
});

avalon.define({
    $id: 'root',
    version: avalon.version
});
avalon.define({
    $id: 'dashboard'
});

avalon.scan();