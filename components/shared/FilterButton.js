/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    View
} = React;

var Items = require('../../constants/ItemConstants');

var FilterButton = React.createClass({
    getInitialState: function() {
        return {
            selected: this.props.current,
            other: this.props.other
        };
    },
    _touchableWithInfo: function(text, source, id) {
        var isSelected = id === this.state.selected;
        var pressFunc = () => {
            var selected = this.state.selected;
            var other = this.state.other;
            var newSelected = id;
            var newOther = other.filter((x) => x !== selected);
            newOther.push(selected);
            this.setState({selected: newSelected, other: newOther});
            this.props.onPressOther(id);
        }
        return (
            <TouchableHighlight
                onPress={isSelected ? () => console.log("selected"): pressFunc}
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
                {this._touchableWithInfo("All", require('../../images/hangar.png'), Items.ANY)}
                {this._touchableWithInfo("Tops", require('../../images/shirt.png'), Items.TOPS)}
                {this._touchableWithInfo("Bottoms", require('../../images/pants.png'), Items.BOTTOMS)}
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
