/**
 * ClothesMatcher main
 * @flow
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

var UserView = require('./components/user/UserView');
var AdminView = require('./components/admin/AdminView');

var ClothesMatcher = React.createClass({
  renderScene: function(route, nav) {
    switch (route.id) { 
      case 'UserView':
        return <UserView nav={nav} returnRoute={{id: 'AdminView'}}/>;
      case 'AdminView':
        return <AdminView nav={nav} returnRoute={{id: 'UserView'}}/>;
      default:
        return <Text>UserView or AdminView not loading</Text>;
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <Navigator
          style={styles.navBounds}
          initialRoute={{id: 'UserView'}}
          renderScene={this.renderScene}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    flex: 0.3
  },
  navBounds: {
    flex: 10,
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent('ClothesMatcherApp',
                              () => ClothesMatcher);
