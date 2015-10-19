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
  TouchableHighlight,
  CameraRoll
} = React;

var ClothesItem = require('./ClothesItem');
type ClothesType = {name: string; picture: object};

var ClothesList = React.createClass({
  getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        //{} is press data, [] is images
        dataSource: ds.cloneWithRows(this._genRows({}, [])),
      };
    },

    _pressData: ({}: {[key: number]: boolean}),

    _images: ([]),

    componentWillMount: function() {
      this._pressData = {};
      //fetch images, this.setState images
      var fetchParams = {
        first: 25,
        groupTypes: 'Album',
        groupName: 'Clothes'
      }
      CameraRoll.getPhotos(fetchParams, this._processImages, this._processImageError);
    },

    _processImages: function(data: object) {
      var assets = data.edges;
      this._images = assets.map((asset) => asset.node.image);
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._pressData, this._images)
      )});
    },

    _processImageError: function(data: object) {
      //TODO: handle error if they don't give permission
      console.log(data);
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

    _renderRow: function(rowData: ClothesType, sectionID: number, rowID: number) {
      return (
       <ClothesItem rowData={rowData}
        onPress={() => this._pressRow(rowID)}
        />
      );
    },

    _genRows: function(pressData: {[key: number]: boolean},
                       images: Array<object>): Array<ClothesType> {
      var pictureBlob = [];
      for (var i = 0; i < images.length; i++) {
        var name = '';
        if (pressData[i]) {
          name = name + i + ' (X)';
        } else {
          name = name + i;
        }
        pictureBlob.push({name: name, picture: images[i]});
      }
      return pictureBlob;
    },

    _pressRow: function(rowID: number) {
      this._pressData[rowID] = !this._pressData[rowID];
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._pressData, this._images)
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
