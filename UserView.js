'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var ClothesList = require('./ClothesList');
var AdminUserSwitcher = require('./AdminUserSwitcher');

var UserView = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
              <View style={styles.clothes_box}>
                <ClothesList />
              </View>
              <View style={styles.clothes_display}>
                {/*<ClothesSelectedDisplay />*/}
                <View style={styles.display}>
                    <Text>ClothesSelectedDisplay</Text>
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
   clothes_box: {
     flex: 7,
     backgroundColor: '#ACFCFF'
   },
   clothes_display: {
     flex: 3,
     flexDirection: 'column'
   },
   display: {
     flex: 9,
     backgroundColor: '#B5DCCF',
   },
   navBar: {
    flex: 1
   }

});


module.exports = UserView;
