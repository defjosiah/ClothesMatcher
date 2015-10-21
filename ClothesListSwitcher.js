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

var ClothesList = require('./ClothesList');
var FilterButton = require('./FilterButton');

var ClothesListSwitcher = React.createClass({
    render: function() {
        return (
          <View style={styles.displayBox}>
                <View style={styles.switchList}>
                  <View style={styles.padding} />
                  {this._setupFilterButton()}
                  <View style={styles.padding} />
                </View>
                <View style={styles.clothesBox}>
                  <ClothesList onPress={this.props.onPress} />
                </View>
          </View>
        );
    },

    _setupFilterButton: function() {
      var currentRoute = this.props.currentRoute;
      var otherRoute = this.props.nav.getCurrentRoutes().
                          filter((x) => x.id != currentRoute.id)[0];
      return <FilterButton current={currentRoute}
                other={otherRoute}
                onPressOther={() => this.props.nav.replace(otherRoute)}
             />;
    }
});

var styles = StyleSheet.create({
  displayBox: {
    flex: 7,
    flexDirection: 'row',
    backgroundColor: '#ACFCFF'
  },
  clothesBox: {
    flex: 10
  },
  switchList: {
    flex: 2
  },
  padding: {
    flex: 10
  }
});

module.exports = ClothesListSwitcher;
