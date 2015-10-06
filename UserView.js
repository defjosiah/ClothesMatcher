'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var ClothesList = require('./ClothesList');

var UserView = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
              <View style={styles.clothes_box}>
                <Text>ClothesLists Are cool</Text>
                <ClothesList />
              </View>
              <View style={styles.clothes_display}>
                {/*<ClothesSelectedDisplay />*/}
                <Text>ClothesSelectedDisplay</Text>
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
     backgroundColor: '#B5DCCF'
   } 
});


module.exports = UserView;
