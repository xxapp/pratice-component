var avalon = require('avalon');

/**
 * datepicker搜索组件
 * @prop label 文本框前的label标签内容
 * @prop col 搜索参数
 * @prop format 日期展示格式
 * 
 * @example
 * ``` html
 * <!-- 注：例1和例2效果是一样的 -->
 * <ms:control-datepicker label="标题1" col="name"></ms:control-datepicker>
 * <ms:control-datepicker label="标题2" duplex="record['name']"></ms:control-datepicker>
 * <ms:control-datepicker label="标题3" duplex="state.text"></ms:control-datepicker>
 * ```
 */
avalon.component('ms:searchItemDatepicker', {
    $template: __inline('./ms-search-item-datepicker.html'),
    $replace: 1,
    $init: function (vm, el) {},
    $ready: function (vm, el) {
        var datepickerId = 'editor' + vm.$id, datepicker;
        var $input = $(el).find('input:hidden');
        vm.$datepickerId = datepickerId; 
        datepicker = $(el).find('input.date-picker').attr('id', datepickerId).val($input.val());
        datepicker.datepicker({
            format: vm.format
        });
        datepicker.on('changeDate', function (e) {
            $input.val(e.target.value);
            datepicker.datepicker('hide');
        });
        vm.$watch('val', function (newV) {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            containerVm.$dirtyQuery[vm.col] = newV;
        });
    },
    $dispose: function (vm) {
    },
    label: '',
    col: '',
    val: '',
    format: 'yyyy-mm-dd',
    $datepickerId: ''
});