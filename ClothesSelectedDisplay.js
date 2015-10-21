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
              <ClothesItem rowData={this.props.imageData}
                          onPress={() => console.log("pressed")}
              />
            </View>
        );
    }
});

var styles = StyleSheet.create({
  display: {
    flex: 9
  },
});


module.exports = ClothesSelectedDisplay;
