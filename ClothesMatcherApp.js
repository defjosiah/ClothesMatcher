/**
 * ClothesMatcher main
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var UserView = require('./UserView');
var AdminView = require('./AdminView');

var ClothesMatcher = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Header</Text>
        </View>
        {/*<UserView />*/}
        <AdminView />
        <View style={styles.footer}>
          <Text>Footer</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1,
    backgroundColor: '#E5FCEF'
  }
});

AppRegistry.registerComponent('ClothesMatcher',
                              () => ClothesMatcher);
