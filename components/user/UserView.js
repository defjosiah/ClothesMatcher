/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;
var UserClothesDisplay = require('./UserClothesDisplay');
var AdminUserSwitcher = require('../shared/AdminUserSwitcher');

var UserView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.selectDisplay}>
          <UserClothesDisplay />
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
  container: {
   flex: 1,
   flexDirection: 'column'
  },
  selectDisplay: {
   flex: 24
  },
  navBar: {
   flex: 2
  }
});

module.exports = UserView;
