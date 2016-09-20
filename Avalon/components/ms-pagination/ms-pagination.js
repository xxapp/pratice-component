var avalon = require('avalon');

avalon.component('ms:pagination', {
    $template: __inline('./ms-pagination.html'),
    $replace: 1,
    $init: function (vm) {
        vm.prevPage = function () {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            if (vm.currentPage > 1) {
                containerVm.loadData(avalon.noop, {
                    start: --vm.currentPage-1,
                    limit: vm.pageCount
                });
            }
        }
        vm.nextPage = function () {
            var containerVm = avalon.vmodels[vm.$containerVmId];
            if (vm.currentPage < vm.pageCount) {
                containerVm.loadData(avalon.noop, {
                    start: ++vm.currentPage-1,
                    limit: vm.pageCount
                });
            }
        }
    },
    currentPage: 1,
    pageCount: 10,
    prevPage: avalon.noop,
    nextPage: avalon.noop,
    $containerVmId: ''
});