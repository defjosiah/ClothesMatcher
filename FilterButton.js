'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    View
} = React;

var FilterButton = React.createClass({
    _touchableWithInfo: function(text, source, isSelected) {
        console.log(isSelected);
        var pressFunc = isSelected ? () => console.log("Do Nothing") :
                                        this.props.onPressOther;
        return (
            <TouchableHighlight
                onPress={isSelected ? () => console.log("selected"): this.props.onPressOther}
                style={isSelected ? styles.buttonSelected : styles.button}>
                <View>
                    <Text style={styles.buttonText}>{text}</Text>
                    <Image style={styles.image} source={source} />
                </View>
            </TouchableHighlight>
        );
    },

    render: function() {
        return (
            <View>
                {this._touchableWithInfo("Shirts", require('image!shirt'), "ShirtView" === this.props.current.id)}
                {this._touchableWithInfo("Pants", require('image!pants'), "PantsView" === this.props.current.id)}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    bounding: {
        flex: 1
    },
    button: {
        padding: 30,
        flex: 5,
        alignItems: 'center',
        backgroundColor: '#FF6961'
    },
    buttonSelected: {
        padding: 30,
        flex: 5,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10
    },
    image: {
      width: 100,
      height: 100
    }
});

module.exports = FilterButton;
