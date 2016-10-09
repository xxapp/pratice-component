var avalon = require('avalon');

function heredoc(fn) {
    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
            replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
}

var container = heredoc(function () {
    /*
        <div>
            <ms-button>sdf</ms-button>
            <div ms-controller="dashboard">
                <ms-button>hello</ms-button>
            </div>
        </div>
    */
});
var button = heredoc(function () {
    /*
        <button ms-click="@go"><slot /></button>
    */
});

avalon.component('ms-container', {
    template: container,
    defaults: {
        onInit: function () {
            console.log(this);
            console.log(arguments);
        },
        onReady: function () {
            console.log(this);
            console.log(arguments);
        },
        onViewChange: function () {
            console.log(this);
            console.log(arguments);
        },
        onDispose: function () {
            console.log(this);
            console.log(arguments);
        }
    }
});
avalon.component('ms-button', {
    template: button,
    soleSlot: 'text',
    defaults: {
        text: 'Click Me',
        go: function () {
            alert('didimermer');
        },
        onInit: function () {
            console.log(this);
            console.log(arguments);
        },
        onReady: function () {
            console.log(this);
            console.log(arguments);
        },
        onViewChange: function () {
            console.log(this);
            console.log(arguments);
        },
        onDispose: function () {
            console.log(this);
            console.log(arguments);
        }
    }
});

avalon.define({
    $id: 'root'
});
avalon.define({
    $id: 'dashboard'
});
avalon.scan(document.body);