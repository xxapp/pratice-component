var avalon = require('avalon');

var currentState = mmState.currentState;
avalon.component('ms:table', {
    content: '',
    $slot: 'content',
    $template: __inline('./ms-table.html'),
    $replace: 1,
    $init: function (vm) {
    },
    $childReady: function (vm, e) {
        // 在所有子组件上面保存容器组件的vmId
        for (var i in vm.$refs) {
            vm.$refs[i].$parentVmId = vm.$parentVmId;
        }
    },
    $parentVmId: ''
});