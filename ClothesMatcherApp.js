/**
 * ClothesMatcher main
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var ClothesList = require('./ClothesList');

var ClothesMatcher = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Header</Text>
        </View>
        <View style={styles.clothes_view}>
          <View style={styles.clothes_box}>
            <Text>ClothesList</Text>
            <ClothesList />
          </View>
          <View style={styles.clothes_display}>
            {/*<ClothesSelectedDisplay />*/}
            <Text>ClothesSelectedDisplay</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Footer</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    flex: 1
  },
  clothes_view: {
    flex: 10,
    flexDirection: 'row'
  },
  clothes_box: {
    flex: 7,
    backgroundColor: '#ACFCFF'
  },
  clothes_display: {
    flex: 3,
    backgroundColor: '#B5DCCF'
  },
  footer: {
    flex: 1,
    backgroundColor: '#E5FCEF'
  }
});

AppRegistry.registerComponent('ClothesMatcher',
                              () => ClothesMatcher);
