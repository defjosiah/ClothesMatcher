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
    render: function() {
        return (
            <View>
                <TouchableHighlight
                 onPress={() => console.log("press me")}
                 style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>Shirts</Text>
                        <Image style={styles.image}  source={require('image!shirt')} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                 onPress={() => console.log("press me")}
                 style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>Pants</Text>
                        <Image style={styles.image} source={require('image!pants')}/>
                    </View>
                </TouchableHighlight>
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
        backgroundColor: '#FF6961',
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
