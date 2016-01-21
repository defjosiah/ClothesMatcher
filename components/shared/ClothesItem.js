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
      var matchStyle = {};
      if (this.props.matchMode) {
        if (this.props.isMatching) {
          matchStyle = styles.matched;
        } else {
          matchStyle = styles.unmatched;
        }
      }
      return (
          <TouchableHighlight onPress={this.props.onPress} underlayColor='rgba(0,0,0,0)'>
            <View>
              <View style={[styles.row, matchStyle]}>
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
  matched: {
    borderWidth: 5,
    borderColor: '#00FF00'
  },
  unmatched: {
    borderWidth: 5,
    borderColor: '#FF0000'
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
