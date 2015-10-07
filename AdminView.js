'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var AdminUserSwitcher = require('./AdminUserSwitcher');
//var Camera = require('react-native-camera');

var AdminView = React.createClass({
    render: function() {
        return (
            <View style={styles.background}>
                <View style={styles.adminArea}>
                    <Text>AdminView Controls Here!</Text>
                </View>
                <View style={styles.navBar}>
                    <AdminUserSwitcher
                     returnRoute={this.props.returnRoute}
                     nav={this.props.nav} />
                 </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
   background: {
     backgroundColor: '#FF7878',
     flex: 1,
     flexDirection: 'column'
   },
   adminArea: {
    flex: 9
   },
   navBar: {
    flex: 1
   }
});

module.exports = AdminView;
