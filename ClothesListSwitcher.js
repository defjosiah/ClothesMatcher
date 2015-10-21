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

var ClothesListSwitcher = React.createClass({
    render: function() {
        return (
          <View style={styles.displayBox}>
                <View style={styles.switchList}>
                </View>
                <View style={styles.clothesBox}>
                  <ClothesList onPress={this.props.onPress} />
                </View>
          </View>
        );
    }
});

var styles = StyleSheet.create({
  displayBox: {
    flex: 7,
    flexDirection: 'row'
  },
  clothesBox: {
    backgroundColor: '#ACFCFF',
    flex: 10
  },
  switchList: {
    backgroundColor: '#FF6961',
    flex: 2
  }
});

module.exports = ClothesListSwitcher;
