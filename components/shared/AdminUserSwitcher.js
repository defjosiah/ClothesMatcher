/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image
} = React;

var AdminUserSwitcher = React.createClass({
    getInitialState: function() {
        return {
            prevRoute: this.props.returnRoute
        };
    },
    render: function() {
        console.log(this.props);
        return (
            <TouchableHighlight
             onPress={() => this.props.nav.replace(this.state.prevRoute)}
             style={styles.button}>
                <View style={styles.combined}>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                    <Image style={styles.image} 
                        source={require('../../images/refresh.png')}
                    />
                </View>
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
        textAlign: "right",
        paddingRight: 5
    },
    combined: {
        flex: 10,
        flexDirection: 'row'
    },
    image: {
        width: 30,
        height: 30
    }
});

module.exports = AdminUserSwitcher;
