require('es5-shim');
require('es5-shim/es5-sham');
import * as React from 'react';
import { render } from 'react-dom';

var AmazingReact = React.createClass({
    getInitialState: function () {
        return {
            text: this.props.text
        };
    },
    changeToUpperCase: function () {
        this.setState({
            text: this.state.text.toUpperCase()
        });
    },
    render: function () {
        return (
            <div>
                <input type="text" value={this.state.text} />
                <button onClick={this.changeToUpperCase}>Upper Case</button>
            </div>
        );
    }
});

render(
    <div>
        <AmazingReact text="Hello Wolrd!"/>
        <AmazingReact text="Amazing React!"/>
        <AmazingReact text="Hello React!"/>
    </div>,
    document.getElementById('container')
);