'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TouchableHighlight
} = React;

var AdminUserSwitcher = React.createClass({
    getInitialState: function() {
        console.log(this.props)
        return {
            prevRoute: this.props.returnRoute
        };
    },
    render: function() {
        return (
            <TouchableHighlight
             onPress={() => this.props.nav.replace(this.state.prevRoute)}
             style={styles.button}>
                <Text style={styles.buttonText}>{this.state.prevRoute.id}</Text>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        padding: 20
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: "right"
    }
});

module.exports = AdminUserSwitcher;
