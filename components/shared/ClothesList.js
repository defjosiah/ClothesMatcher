/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  CameraRoll,
  Image,
  ListView,
  StyleSheet,
  View,
  TouchableHighlight
} = React;

var ClothesItem = require('./ClothesItem');
var ClothesStore = require('../../stores/ClothesStore');
var Format = require('../../utils/format.js');
var items = require('../../constants/ItemConstants');
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
      ClothesStore.init();
    },
    componentDidMount: function() {
      var where = {
        where: {
          type: items.ANY 
        },
        fields: {
          pictureID: true
        }
      }
      var success = (pictureIDs) => {
        this._processImages(pictureIDs.map((x) => 
                              Format.buildAsset(x.pictureID)));
      }
      ClothesStore.getItemsWithFilter(where, success, console.log("failure"));
    },
    _processImages: function(images) {
      this._images = images;
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._pressData, this._images)
      )});
    },
    _processImageError: function(data: object) {
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
      console.log(rowData);
      return (
       <ClothesItem rowData={rowData}
        onPress={() => this._handleTap(rowID, rowData)}
        />
      );
    },

    _handleTap: function(rowID, rowData) {
      this._pressRow(rowID);
      this.props.onPress(rowData);
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
        pictureBlob.push({name: name, picture: {uri: images[i]}});
      }
      console.log("BLOB: ");
      console.log(pictureBlob);
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
      flexWrap: 'wrap',
    }
});


module.exports = ClothesList;
