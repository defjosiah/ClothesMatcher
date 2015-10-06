'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var AdminView = React.createClass({
    render: function() {
        return (
            <View style={styles.background}>
                <Text>AdminView</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
   background: {
     backgroundColor: '#FF7878',
     flex: 10,
     flexDirection: 'row'
   }
});

module.exports = AdminView;
