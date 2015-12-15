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
var items = require('../../constants/ItemConstants');

var ClothesListSwitcher = React.createClass({
    getInitialState: function() {
      return this._getAllStates(this.props.currentRoute.id);
    },
    render: function() {
        console.log("Rerender: " + JSON.stringify(this.state));
        return (
          <View style={styles.displayBox}>
                <View style={styles.switchList}>
                  <View style={styles.padding} />
                  {this._setupFilterButton()}
                  <Text>{this.state.current}</Text>
                  <Text>{this.state.other}</Text>
                  <View style={styles.padding} />
                </View>
                <View style={styles.clothesBox}>
                  <ClothesList
                    onPress={this.props.onPress}
                    where={this.state.where}
                  />
                </View>
          </View>
        );
    },
    _getAllStates: function(current) {
      var otherRoutes = null;
      var where = {
        where: {
          type: ''
        },
        fields: {
          pictureID: true
        }
      }
      console.log(current);
      switch (current) {
        case 'ShirtView':
          otherRoutes = ['PantsView', 'AllView'];
          where.where.type = items.TOPS;
          break;
        case 'PantsView':
          otherRoutes = ['ShirtView', 'AllView'];
          where.where.type = items.BOTTOMS;
          break;
        case 'AllView':
          console.log("IN THIS CASE");
          otherRoutes = ['ShirtView', 'PantsView'];
          where.where.type = items.ANY;
          break;
      }
      return {current: current, other: otherRoutes, where: where}
    },
    _setupFilterButton: function() {
      return <FilterButton current={this.state.current}
                other={this.state.other}
                onPressOther={(newRoute) => this.setState(this._getAllStates(newRoute))}
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
