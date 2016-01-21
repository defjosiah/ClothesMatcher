/**
 * @flow
 * Implements the CustomSelectedUnselected component standard.
 */

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} = React;

var SelectableImage = React.createClass({
    render: function() {
        return (
          <TouchableHighlight onPress={this.props.onPress}>
            <View style={this.props.isSelected ? styles.selected : styles.unselected}>
                <Image 
                    style={styles.image}
                    source={this.props.source}
                />
                <Text style={styles.text}>{this.props.label}</Text>
            </View>
          </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    unselected: {
        padding: 30,
        flex: 5,
        alignItems: 'center'
    },
    selected: {
        padding: 30,
        flex: 5,
        alignItems: 'center',
        backgroundColor: '#FF6961'
    },
    text: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center'
    },
    image: {
        width: 90,
        height: 100
    }
});

module.exports = SelectableImage;
