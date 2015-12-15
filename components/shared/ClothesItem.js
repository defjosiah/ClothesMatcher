/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;
var Format = require('../../utils/format.js');

var ClothesItem = React.createClass({
    render: function() {
      return (
          <TouchableHighlight onPress={this.props.onPress} underlayColor='rgba(0,0,0,0)'>
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {this.props.rowData.name}
                </Text>
                <Image style={styles.image}
                  source={{ uri: Format.buildAsset(this.props.rowData.pictureID)}} 
                />
              </View>
            </View>
          </TouchableHighlight>
      );
    }
});

var height = 250;
var styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: height,
    height: height,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
  image: {
    width: height-50,
    height: height-50,
  }
});

module.exports = ClothesItem;
