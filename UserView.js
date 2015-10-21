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
            userView={this}
          />;
    },

    render: function() {
        return (
            <View style={styles.container}>
              <Navigator
                style={styles.clothes_box}
                initialRoute={{id: 'PantsView'}}
                renderScene={this.renderScene}
              />
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
   clothes_box: {
     flex: 7,
     backgroundColor: '#ACFCFF'
   },
   clothes_display: {
     flex: 3,
     flexDirection: 'column'
   },
   navBar: {
    flex: 1
   }

});


module.exports = UserView;
