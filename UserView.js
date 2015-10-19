'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var ClothesList = require('./ClothesList');
var AdminUserSwitcher = require('./AdminUserSwitcher');
var ClothesSelectedDisplay = require('./ClothesSelectedDisplay');

var UserView = React.createClass({
    getInitialState: function() {
      return {
        imageData: {name: '', picture: {uri: ''}}
      };
    },

    render: function() {
        return (
            <View style={styles.container}>
              <View style={styles.clothes_box}>
                <ClothesList onPress={(imageData) => this.setState({imageData})}/>
              </View>
              <View style={styles.clothes_display}>
                <ClothesSelectedDisplay imageData={this.state.imageData}/>
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
