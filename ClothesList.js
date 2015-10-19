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
  TouchableHighlight
} = React;

var ClothesItem = require('./ClothesItem');

var ClothesList = React.createClass({
  getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows(this._genRows({})),
      };
    },

    _pressData: ({}: {[key: number]: boolean}),

    componentWillMount: function() {
      this._pressData = {};
    },

    render: function() {
      return (
        // ListView wraps ScrollView and so takes on its properties. 
        // With that in mind you can use the ScrollView's
        // contentContainerStyle prop to style the items.
        <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      );
    },

    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
      return (
               <ClothesItem rowData={rowData}
                onPress={() => this._pressRow(rowID)}
                />
              );
    },

    _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
      var dataBlob = [];
      for (var ii = 0; ii < 100; ii++) {
        var pressedText = pressData[ii] ? ' (X)' : '';
        dataBlob.push('ALLLEEEXXX is super cool IS ' + ii + pressedText);
      }
      return dataBlob;
    },

    _pressRow: function(rowID: number) {
      this._pressData[rowID] = !this._pressData[rowID];
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._pressData)
      )});
    },
  });

  var styles = StyleSheet.create({
    list: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  });


module.exports = ClothesList;
