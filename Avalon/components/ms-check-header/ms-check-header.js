var avalon = require('avalon');

avalon.component('ms:checkHeader', {
    $template: '<th><div class="checkbox"><label><input type="checkbox" ms-duplex-checked="checked" ms-change="toggleCheckd()"><span class="text"></span></label></div></th>',
    $replace: 1,
    $init: function (vm) {
    },
    checked: false
});