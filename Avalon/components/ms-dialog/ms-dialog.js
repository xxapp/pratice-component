var avalon = require('avalon');
var bootbox = require('bootbox.js/bootbox');

avalon.component('ms:dialog', {
    $slot: 'content',
    content: '',
    $template: '{{content|html}}',
    $replace: 1,
    $init: function (vm) {
        var params = {isEdit: true};
        bootbox.dialog({
            message: vm.content,
            title: params.isEdit ? '修改地址' : '新增地址',
            className: params.isEdit ? 'modal-primary' : 'modal-success',
            buttons: {
                save: {
                    label: '保存',
                    className: "btn-blue",
                    callback: function (close) { 
                        // 这里发送请求
                        console.log(params.isEdit ? '修改' : '新增', form.demo.$model);
                        // 在回调里调用这个函数来关闭对话框
                        close();
                        // 返回true则直接关闭对话框
                        // 返回false则在调用close后才会关闭对话框
                        return false;
                    }
                },
                cancel: {
                    label: '取消',
                    className: "btn-default",
                    callback: function () {
                    }
                }
            }
        })
    },
    containerVmId: ''
});