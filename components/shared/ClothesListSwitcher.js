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
          type: this.props.initialRoute
        },
        fields: {
          pictureID: true,
          name: true,
          type: true
        }
      };
      var initialState = this._getStateForRoute(this.props.initialRoute);
      return {
        current: initialState.current,
        other: initialState.other,
        pictureIDs: [],
        where: where,
        imageData: {
          name: 'Sanity Check', 
          pictureID: '08A4B940-71E3-498C-9656-4863BE067C6B',
          type: initialState.other[1]
        }
      };
    },
    _getStateForRoute: function(route) {
      var other = [];
      switch(route) {
        case Items.ANY:
          other = [Items.TOPS, Items.BOTTOMS];
          break;
        case Items.TOPS:
          other = [Items.ANY, Items.BOTTOMS];
          break;
        case Items.BOTTOMS:
          other = [Items.ANY, Items.TOPS];
          break;
      }
      return {
        current: route,
        other: other
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
                onPress={this.handleListPress}
                pictureIDs={this.state.pictureIDs}
              />
            </View>
            <View style={styles.viewBox}>
              <ClothesSelectedDisplay
                editable={true}
                imageData={this.state.imageData}
                nameChange={(newName, ID) => this.handleNameChange(newName, ID)}
                typeChange={(newType, ID) => this.handleTypeChange(newType, ID)}
              />
            </View>
          </View>
        );
    },
    handleNameChange: function(newName, pictureID) {
      console.log(newName);
      console.log(pictureID);
      var success = () => console.log("WOOO");
      var failure = () => console.log("NOOOO");
      ClothesStore.setItemName(pictureID, newName, success, failure);
    },
    handleTypeChange: function(newType, pictureID) {
      console.log(newType);
      console.log(pictureID);
      var success = () => console.log("WOOO Type");
      var failure = () => console.log("NOOOO Type");
      ClothesStore.setItemType(pictureID, newType, success, failure);
    },
    filterImageForView: function(current) {
      var initialState = this._getStateForRoute(current);
      var newWhere = this.state.where;
      newWhere.where.type = initialState.current;
      this.updateState(current, initialState.other, newWhere);
    },
    handleListPress: function(newData) {
      var currentState = this.state;
      currentState.imageData = newData;
      this.setState(currentState);
    },
    updateState: function(current, other, where) {
      var newPics = (filterPics) => {
        var pictureIDs = filterPics.map((x) => {
                                    return {
                                      pictureID: x.pictureID,
                                      name: x.name,
                                      type: x.type
                                    }
                                  });
        this.setState({ current: current,
                        other: other, where: where,
                        pictureIDs: pictureIDs,
                        imageData: this.state.imageData
                      });
      };
      var noPics = () => {
        this.setState({current: current, other: other, where: where,
                        pictureIDs:[], imageData: this.state.imageData});
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
