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
        dataSource: ds.cloneWithRows(this._genRows(this.props.pictureIDs,
                                                   this.props.matching))
      };
    },
  componentWillReceiveProps: function(newProps) {
    this._processImages(newProps.pictureIDs, newProps.matching);
  },
    _images: ([]),
    _processImages: function(images, matching) {
      this._images = images;
      this._matching = matching;
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._images, this._matching)
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
      var matchMode = this._matching.pictureID !== '';
      if (matchMode) {
        var isAdd = this._matching.matches.indexOf(rowData.pictureID) < 0;
        this.props.onMatchPress(this._matching.pictureID, rowData.pictureID,
                                isAdd);
        if (isAdd) {
          this._matching.matches.push(rowData.pictureID);
        } else {
          var rmIndex = this._matching.matches.indexOf(rowData.pictureID);
          this._matching.matches.splice(rmIndex, 1);
        }
        this._processImages(this._images, this._matching);
      } else {
        this.props.onPress(rowData);
      }
    },

    _genRows: function(images: Array<object>, matching): Array<ClothesType> {
      var matchMode = matching.pictureID !== '';
      var pictureBlob = [];
      for (var i = 0; i < images.length; i++) {
        var imageStruct = images[i];
        var name = imageStruct.name;
        if (name === '') {
          name = 'Item ' + i;
        }
        if (matchMode) {
          if (matching.matches.indexOf(imageStruct.pictureID) < 0) {
            name = name + ' Doesn\'t Match';
          } else {
            name = name + ' Matches'
          }
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
