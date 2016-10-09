var avalon = require('avalon');
var beyond = require('/vendor/beyond');
var Notify = beyond.Notify;
var bootbox = require('bootbox.js/bootbox');

var store = require('/services/storeService.js');

avalon.component('ms:dataBox', {
    $solt: 'content',
    content: '',
    $template: '{{content|html}}',
    $replace: 0,
    $init: function (vm) {
        var entityStore;
        var dialogVm = avalon.vmodels[vm.dialogId];

        entityStore = store[vm.store];
        if (!vm.store) { avalon.error('没有配置数据源，<ms:data-box store="demo">......') }
        if (!entityStore) { avalon.error('配置了数据源，但数据源[' + vm.store + ']似乎未定义，/services/storeService.js') }
        if (vm.dialogId && !dialogVm) { avalon.error('配置了dialogId:[' + vm.dialogId + ']，但是没找到对应的组件vm') }

        vm.actions.add = function () {
            var dialogVm = avalon.vmodels[vm.dialogId];
            dialogVm.isEdit = false;
            avalon.mix(dialogVm, { record: entityStore.initialData() });
            dialogVm.show = true;
        }
        vm.actions.edit = function (record) {
            var dialogVm = avalon.vmodels[vm.dialogId];
            dialogVm.isEdit = true;
            avalon.mix(dialogVm, { record: record.$model });
            dialogVm.show = true;
        }
        vm.actions.del = function (record) {
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
                vm.total = result.total;
                vm.checked.clear();
            });
        }
        if (dialogVm) {
            dialogVm.power = function () {
                dialogVm.$dialog.find('form').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    submitHandler: function (validator, form, submitButton) {
                        // Do nothing
                    },
                    fields: vm.$validFields
                });
            }
            dialogVm.$post = function (package) {
                dialogVm.$dialog.find('form').data('bootstrapValidator').validate()
                if (!dialogVm.$dialog.find('form').data('bootstrapValidator').isValid()) {
                    return false;
                }
                vm.processData(package, function (handleResult) {
                    if (!package.isEdit) {
                        entityStore.insert(package.record).then(function (r) {
                            if (r.code == '0') {
                                Notify('添加成功', 'top-right', '5000', 'success', 'fa-check', true);
                                vm.loadData();
                            }
                            handleResult(r);
                        });
                    } else {
                        entityStore.update(package.record).then(function (r) {
                            if (r.code == '0') {
                                Notify('修改成功', 'top-right', '5000', 'success', 'fa-check', true);
                                vm.loadData();
                            }
                            handleResult(r);
                        });
                    }
                });
            }
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
    $validateFields: {},
    list: [],
    $query: {
        start: 0,
        limit: 10
    },
    total: 1,
    $dirtyQuery: {},
    checked: [],
    actions: {},
    loadData: avalon.noop,
    processData: avalon.noop
});