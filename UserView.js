/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var AdminUserSwitcher = require('./AdminUserSwitcher');
var ClothesSelectedDisplay = require('./ClothesSelectedDisplay');
var ClothesListSwitcher = require('./ClothesListSwitcher');

var UserView = React.createClass({
    getInitialState: function() {
      return {
        shirtData: {name: '', picture: {uri: ''}},
        pantsData: {name: '', picture: {uri: ''}}
      };
    },

    renderScene: function(route, nav) {
        return <ClothesListSwitcher currentRoute={route} 
            nav={nav}
            onPress={(imageData) => this._handlePressForRoute(imageData, route)}
          />;
    },

    _handlePressForRoute: function(imageData, route) {
      var newState = this.state;
      switch (route.id) {
        case 'ShirtView':
          newState.shirtData = imageData;
          break;
        case 'PantsView':
          newState.pantsData = imageData;
          break;
      }
      this.setState(newState);
    },

    render: function() {
        return (
            <View style={styles.container}>
              <View style={styles.select_display}>
                <Navigator
                  initialRoute={{id: 'ShirtView'}}
                  renderScene={this.renderScene}
                />
              </View>
              <View style={styles.clothes_display}>
                <ClothesSelectedDisplay imageData={this.state.shirtData}/>
                <ClothesSelectedDisplay imageData={this.state.pantsData}/>
                <View style={styles.navBar}>
                    <AdminUserSwitcher
                     returnRoute={this.props.returnRoute}
                     nav={this.props.nav} />
                </View>
              </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
   container: {
    flex: 1,
    flexDirection: 'row'
   },
   clothes_display: {
     flex: 3,
     flexDirection: 'column'
   },
   select_display: {
    flex: 7
   },
   navBar: {
    flex: 1
   }

});


module.exports = UserView;
