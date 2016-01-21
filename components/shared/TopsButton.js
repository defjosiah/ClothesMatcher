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

var TopsButton = React.createClass({
    render: function() {
        {console.log(this.props.isSelected)}
        return (
          <TouchableHighlight onPress={this.props.onPress}>
              <View>
                <View style={this.props.isSelected ? styles.selected : styles.unselected}>
                    <Text style={styles.buttonText}>Tops</Text>  
                </View>
                <Image 
                    style={styles.image}
                    source={require('../../images/shirt.png')}
                />
              </View>
          </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    unselected: {
        padding: 30,
        flex: 5,
        alignItems: 'center',
        backgroundColor: '#FF6961'
    },
    selected: {
        padding: 30,
        flex: 5,
        alignItems: 'center'
    },
    text: {
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

module.exports = TopsButton;
