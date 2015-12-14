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
                  <ClothesList
                    onPress={this.props.onPress}
                    filterFunc={(x) => x.type = "TOP"}
                  />
                </View>
          </View>
        );
    },

    _setupFilterButton: function() {
      var otherRoute = null;
      switch (this.props.currentRoute.id) {
        case 'ShirtView':
          otherRoute = {id: "PantsView"};
          break;
        case 'PantsView':
          otherRoute = {id: "ShirtView"};
          break;
      }
      return <FilterButton current={this.props.currentRoute}
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
