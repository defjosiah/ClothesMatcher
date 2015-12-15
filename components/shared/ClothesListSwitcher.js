/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var FilterButton = require('./FilterButton');
var ClothesList = require('./ClothesList');
var ClothesSelectedDisplay = require('./ClothesSelectedDisplay');
var ClothesStore = require('../../stores/ClothesStore');
var Format = require('../../utils/format.js');
var Items = require('../../constants/ItemConstants');

var ClothesListSwitcher = React.createClass({
    getInitialState: function() {
      var where = {
        where: {
          type: Items.ANY
        },
        fields: {
          pictureID: true
        }
      }
      return {
        current:'AllView',
        other: ['ShirtView', 'PantsView'],
        pictureIDs:[],
        where:where,
        imageData: {
          name: 'Test', 
          picture: {uri: 'assets-library://asset/asset.PNG?id=08A4B940-71E3-498C-9656-4863BE067C6B&ext=PNG'}
        }
      };
    },
    /**
     * Only called once, after the initial render to kick off a full render.
     */
    componentDidMount: async function() {
      await ClothesStore.init();
      this.filterImageForView(this.state.current);
    },
    render: function() {
        return (
          <View style={styles.displayBox}>
            <View style={styles.switchList}>
              <View style={styles.padding} />
                {this._setupFilterButton()}
              <View style={styles.padding} />
            </View>
            <View style={styles.clothesBox}>
              <ClothesList
                onPress={this.props.onPress}
                pictureIDs={this.state.pictureIDs}
              />
            </View>
            <View style={styles.viewBox}>
              <ClothesSelectedDisplay
                editable={true}
                imageData={this.state.imageData}
              />
            </View>
          </View>
        );
    },
    filterImageForView: function(current) {
      var otherRoutes = null;
      var itemFilter = '';
      switch (current) {
        case 'ShirtView':
          otherRoutes = ['PantsView', 'AllView'];
          itemFilter = Items.TOPS;
          break;
        case 'PantsView':
          otherRoutes = ['ShirtView', 'AllView'];
          itemFilter = Items.BOTTOMS;
          break;
        case 'AllView':
          otherRoutes = ['ShirtView', 'PantsView'];
          itemFilter = Items.ANY;
          break;
      }
      var newWhere = this.state.where;
      newWhere.where.type = itemFilter;
      this.updateState(current, otherRoutes, newWhere);
    },
    updateState: function(current, other, where) {
      var newPics = (filterPics) => {
        var pictureIDs = filterPics.map((x) => 
                              Format.buildAsset(x.pictureID));
        this.setState({ current: current,
                        other: other, where: where,
                        pictureIDs: pictureIDs
                      });
      };
      var noPics = () => {
        this.setState({current: current, other: other, where: where,
                        pictureIDs:[]});
      };
      ClothesStore.getItemsWithFilter(where, newPics, noPics);
    },
    _setupFilterButton: function() {
      return <FilterButton current={this.state.current}
                other={this.state.other}
                onPressOther={(newRoute) => this.filterImageForView(newRoute)}
             />;
    }
});

var styles = StyleSheet.create({
  displayBox: {
    flex: 7,
    flexDirection: 'row'
  },
  clothesBox: {
    flex: 7,
    backgroundColor: '#ACFCFF'
  },
  switchList: {
    flex: 1,
    backgroundColor: '#ACFCFF'
  },
  viewBox: {
    flex: 3,
    backgroundColor: '#FFFFFF'
  },
  padding: {
    flex: 10
  }
});

module.exports = ClothesListSwitcher;
