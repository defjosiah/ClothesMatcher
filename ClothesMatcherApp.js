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
  renderScene: function(route, nav) {
    switch (route.id) {
      case 'UserView':
        return <UserView nav={nav} />;
      case 'AdminView':
        return <AdminView nav={nav} />;
      default:
        return <Text>UserView or AdminView not loading</Text>;
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Header</Text>
        </View>
        <Navigator
          style={styles.navBounds}
          initialRoute={{id: 'UserView'}}
          renderScene={this.renderScene}
        />
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
  },
  navBounds: {
    flex: 10,
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent('ClothesMatcher',
                              () => ClothesMatcher);
