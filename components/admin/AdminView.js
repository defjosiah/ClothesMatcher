'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Navigator
} = React;

var AdminUserSwitcher = require('../shared/AdminUserSwitcher');
var ClothesSelectedDisplay = require('../shared/ClothesSelectedDisplay');
var ClothesListSwitcher = require('../shared/ClothesListSwitcher');
var CameraUtil = require('./CameraUtil');
var ClothesStore = require('../../stores/ClothesStore');
var Format = require('../../utils/format.js');

var AdminView = React.createClass({
    componentDidMount: function() {
    },
    getInitialState: function() {
      return {
        matchData: {name: 'Test', picture: {uri: 'assets-library://asset/asset.PNG?id=08A4B940-71E3-498C-9656-4863BE067C6B&ext=PNG'}}
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
      newState.matchData = imageData;
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
                  <View style={styles.clothingImages}>
                    <ClothesSelectedDisplay imageData={this.state.matchData}/>
                  </View>
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
    flexDirection: 'column',
  },
  clothingImages: {
   alignItems: 'center',
   flex: 10,
   backgroundColor: 'white'
  },
  select_display: {
   flex: 7
  },
  navBar: {
   flex: 1
  }
});

module.exports = AdminView;
