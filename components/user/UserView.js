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

var AdminUserSwitcher = require('../shared/AdminUserSwitcher');
var ClothesListSwitcher = require('../shared/ClothesListSwitcher');
var Items = require('../../constants/ItemConstants');

var UserView = React.createClass({
    getInitialState: function() {
      return {
        shirtData: {name: '', picture: {uri: ''}},
        pantsData: {name: '', picture: {uri: ''}}
      };
    },
    render: function() {
        return (
            <View style={styles.container}>
                <View style={styles.selectDisplay}>
                  <ClothesListSwitcher initialRoute={Items.TOPS}
                    editable={false} />
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
