'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image
} = React;

var ClothesItem = require('./ClothesItem');

var ClothesSelectedDisplay = React.createClass({
    render: function() {
        return (
            <View style={styles.display}>
              <Text>
                ClothesSelectedDisplay
                {this.props.imageData}
              </Text>
              <ClothesItem rowData={this.props.imageData}
                          onPress={() => console.log("pressed")}
              />
            </View>
        );
    }
});

var height = 250;
var styles = StyleSheet.create({
  display: {
    flex: 9,
    backgroundColor: '#B5DCCF',
  },
});


module.exports = ClothesSelectedDisplay;
