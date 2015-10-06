'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var AdminUserSwitcher = require('./AdminUserSwitcher');

var AdminView = React.createClass({
    render: function() {
        return (
            <View style={styles.background}>
                <View style={styles.adminArea}>
                    <Text>AdminView Controls Here!</Text>
                </View>
                <AdminUserSwitcher
                 returnRoute={this.props.returnRoute}
                 nav={this.props.nav} />
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
   }
});

module.exports = AdminView;
