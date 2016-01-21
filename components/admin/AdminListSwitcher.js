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

var ClothesList = require('../shared/ClothesList');
var CustomRadio = require('../shared/CustomRadio');
var SelectableImage = require('../shared/SelectableImage');
var ClothesSelectedDisplay = require('../shared/ClothesSelectedDisplay');
var ClothesStore = require('../../stores/ClothesStore');
var Format = require('../../utils/format.js');
var Items = require('../../constants/ItemConstants');

var AdminListSwitcher = React.createClass({
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
      matching: {pictureID: '', matches: []},
      imageData: {
        name: '', 
        pictureID: '',
        type: Items.ANY
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
              <CustomRadio selectedIndex={0}>
                <SelectableImage
                  onPress={() => this.filterImageForView(Items.ANY)}
                  source={require('../../images/hangar.png')}
                  label={"All"}
                 />
                 <SelectableImage
                   onPress={() => this.filterImageForView(Items.TOPS)}
                   source={require('../../images/shirt.png')}
                   label={"Tops"}
                  />
                  <SelectableImage
                    onPress={() => this.filterImageForView(Items.BOTTOMS)}
                    source={require('../../images/pants.png')}
                    label={"Bottoms"}
                   />
              </CustomRadio>
          </View>
          <View style={styles.clothesBox}>
            <ClothesList
              onPress={this.handleListPress}
              onMatchPress={this.handleMatchPress}
              pictureIDs={this.state.pictureIDs}
              matching={this.state.matching}
            />
          </View>
          <View style={styles.viewBox}>
            <ClothesSelectedDisplay
              editable={this.props.editable}
              imageData={this.state.imageData}
              nameChange={(newName, ID) => this.handleNameChange(newName, ID)}
              typeChange={(newType, ID) => this.handleTypeChange(newType, ID)}
              matchChange={(type, ID) => this.handleMatchChange(type, ID)}
            />
          </View>
        </View>
      );
  },
  handleNameChange: function(newName, pictureID) {
    //TODO: update on success or failure
    var success = () => console.log("WOOO");
    var failure = () => console.log("NOOOO");
    ClothesStore.setItemName(pictureID, newName, success, failure);
  },
  handleTypeChange: function(newType, pictureID) {
    //TODO: update on success or failure
    var success = () => console.log("WOOO Type");
    var failure = () => console.log("NOOOO Type");
    ClothesStore.setItemType(pictureID, newType, success, failure);
  },
  handleMatchChange: function(type, matchID) {
    var newRoute = type === Items.TOPS ? Items.BOTTOMS : Items.TOPS;
    var newState = this._getStateForRoute(newRoute);
    var newWhere = this.state.where;
    newWhere.where.type = newRoute;
    this.updateStateMatching(newRoute, newState.other, newWhere, matchID);
  },
  updateStateMatching: function(current, other, where, matchID) {
    var newPics = (filterPics, matches) => {
      console.log(filterPics);
      console.log(matches);
      this.setState({ current: current,
                      other: other, where: where,
                      pictureIDs: filterPics,
                      imageData: this.state.imageData,
                      matching: {pictureID: matchID, matches: matches.matches}
                    });
    };
    var noPics = () => {
      this.setState({current: current, other: other, where: where,
                      pictureIDs:[], imageData: this.state.imageData,
                      matching: this.state.matching});
    };
    ClothesStore.getMatchingItemsWithFilter(where, matchID, newPics, noPics);
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
  handleMatchPress: function(matchID, targetID, isAdd) {
    if (isAdd) {
      ClothesStore.addMatch(matchID, targetID);
    } else {
      ClothesStore.removeMatch(matchID, targetID);
    }
  },
  updateState: function(current, other, where) {
    var newPics = (filterPics) => {
      this.setState({ current: current,
                      other: other, where: where,
                      pictureIDs: filterPics,
                      imageData: this.state.imageData,
                      matching: {pictureID: '', matches: []}
                    });
    };
    var noPics = () => {
      this.setState({current: current, other: other, where: where,
                      pictureIDs:[], imageData: this.state.imageData,
                      matching: {pictureID: '', matches: []}});
    };
    ClothesStore.getItemsWithFilter(where, newPics, noPics);
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

module.exports = AdminListSwitcher;
