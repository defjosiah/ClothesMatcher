/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var Circle = React.createClass({
  render: function() {
    var size = this.props.size || 20;
    return (
      <View
        style={{
          borderRadius: size / 2,
          backgroundColor: '#527fe4',
          width: size,
          height: size,
          margin: 1,
        }}
      />
    );
  }
});

var ClothesList = React.createClass({
  statics: {
    title: '<ClothesList>',
    description: 'List of clothing items'
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._getPictures()),
    };
  },

  componentWillMount: function() {
  },

  render: function() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
    );
  },

  _renderRow: function(rowData: Array<string>) {
    console.log(rowData);
    return (
        <View>
          <Text style={styles.text}>
            {rowData}
          </Text>
          <Circle />
        </View>
    );
  },

  _getPictures: function() : Array<string> {
    return ["This is cool"];
  }
});

var styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

module.exports = ClothesList;
