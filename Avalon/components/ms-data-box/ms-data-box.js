var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;
var bootbox = require('bootbox.js/bootbox');

var store = require('/services/storeService.js');

var entityStore;
avalon.component('ms:dataBox', {
    $solt: 'content',
    content: '',
    $template: '{{content|html}}',
    $replace: 0,
    $init: function (vm) {
        var dialogVm = avalon.vmodels[vm.dialogId];
        entityStore = store[vm.store];
        if (!vm.store) { avalon.error('没有配置数据源，<ms:data-box store="demo">......') }
        if (!entityStore) { avalon.error('配置了数据源，但数据源[' + vm.store + ']似乎未定义，/services/storeService.js') }
        if (!dialogVm) { avalon.error('配置了dialogId:[' + vm.dialogId + ']，但是没找到对应的组件vm') }

        vm.add = function () {
            var dialogVm = avalon.vmodels[vm.dialogId];
            dialogVm.isEdit = false;
            avalon.mix(dialogVm, { record: entityStore.initialData() });
            dialogVm.show = true;
        }
        vm.edit = function (record) {
            var dialogVm = avalon.vmodels[vm.dialogId];
            dialogVm.isEdit = true;
            avalon.mix(dialogVm, { record: record.$model });
            dialogVm.show = true;
        }
        vm.del = function (record) {
            bootbox.confirm("确定删除?", function (result) {
                if (result) {
                    entityStore.del(record[entityStore.key]).then(function (r) {
                        if (r.code == '0') {
                            vm.loadData();
                            Notify('删除成功', 'top-right', '5000', 'success', 'fa-check', true);
                        }
                    });
                }
            });
        }
        vm.loadData = function (cb, params) {
            vm.$query = avalon.mix(vm.$query, params);
            entityStore.list(vm.$query).then(function (result) {
                cb && cb();
                beyond.hideLoading();
                // 更新vm
                vm.list = result.list;
                vm.checked.clear();
            });
        }
        dialogVm.$post = function (package) {
            vm.processData(package, function (handleResult) {
                if (!package.isEdit) {
                    entityStore.insert(package.record).then(function (r) {
                        if (r.code == '0') {
                            Notify('添加成功', 'top-right', '5000', 'success', 'fa-check', true);
                        }
                        handleResult(r);
                    });
                } else {
                    entityStore.update(package.record).then(function (r) {
                        if (r.code == '0') {
                            Notify('修改成功', 'top-right', '5000', 'success', 'fa-check', true);
                        }
                        handleResult(r);
                    });
                }
            });
            // 初始化上传插件
            // $("#file_upload_1").uploadify({
            //     height        : 30,
            //     swf           : __uri('/vendor/uploadify/uploadify.swf'),
            //     uploader      : configService.springApi.url + '/uploadify/uploadify.php',
            //     width         : 120
            // });
        }
    },
    $childReady: function (vm, e) {
        // 在所有子组件上面保存容器组件的vmId
        for (var i in vm.$refs) {
            vm.$refs[i].$containerVmId = vm.$id;
        }
    },
    $ready: function (vm) {
        vm.onInit(vm);
    },
    store: '',
    dialogId: '',
    list: [],
    $query: {
        start: 0,
        limit: 10
    },
    $dirtyQuery: {},
    checked: [],
    actionBtns: '',
    add: avalon.noop,
    edit: avalon.noop,
    del: avalon.noop,
    loadData: avalon.noop,
    processData: avalon.noop
});