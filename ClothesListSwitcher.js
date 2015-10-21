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
        return  <View>
                    <ClothesList onPress={() => console.log("First")} />
                    <ClothesList onPress={() => console.log("Second")} />
                </View>;
    }
});

module.exports = ClothesListSwitcher;
