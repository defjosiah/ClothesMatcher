/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  ListView,
  StyleSheet,
} = React;

var ClothesItem = require('./ClothesItem');
var Format = require('../../utils/format.js');
type ClothesType = {name: string; pictureID: string; type: string};

var ClothesList = React.createClass({
  getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows(this._genRows(this.props.pictureIDs))
      };
    },
  componentWillReceiveProps: function(newProps) {
    this._processImages(newProps.pictureIDs);
  },
    _images: ([]),
    _processImages: function(images) {
      console.log(images);
      this._images = images;
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._images)
      )});
    },
    render: function() {
      return (
        //  wraps ScrollView and so takes on its properties. 
        // With that in mind you can use the ScrollView's
        // contentContainerStyle prop to style the items.
        <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      );
    },

    _renderRow: function(rowData: ClothesType, sectionID: number, rowID: number) {
      return (
       <ClothesItem rowData={rowData}
        onPress={() => this._handleTap(rowID, rowData)}
        />
      );
    },

    _handleTap: function(rowID, rowData) {
      this.props.onPress(rowData);
    },

    _genRows: function(images: Array<object>): Array<ClothesType> {
      var pictureBlob = [];
      for (var i = 0; i < images.length; i++) {
        var imageStruct = images[i];
        var name = imageStruct.name;
        if (name === '') {
          name = 'Item ' + i;
        }
        pictureBlob.push({
          name: name,
          pictureID: imageStruct.pictureID,
          type: imageStruct.type
        });
      }
      return pictureBlob;
    }
});

var styles = StyleSheet.create({
    list: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }
});

module.exports = ClothesList;
