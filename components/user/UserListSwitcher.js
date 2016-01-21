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
var UserSelectedDisplay = require('./UserSelectedDisplay');
var ClothesStore = require('../../stores/ClothesStore');
var Format = require('../../utils/format.js');
var Items = require('../../constants/ItemConstants');

var UserListSwitcher = React.createClass({
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
      topData: {
        name: '', 
        pictureID: '',
        type: Items.ANY
      },
      bottomData: {
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
              matchStyle={false}
            />
          </View>
          <View style={styles.viewBox}>
            <UserSelectedDisplay
              topData={this.state.topData}
              bottomData={this.state.bottomData}
              matchChange={(imageData) => this.handleMatchChange(imageData)}
            />
          </View>
        </View>
      );
  },
  handleMatchChange: function(imageData) {
    var newRoute = imageData.type === Items.TOPS ? Items.BOTTOMS : Items.TOPS;
    var newState = this._getStateForRoute(newRoute);
    var newWhere = this.state.where;
    newWhere.where.type = newRoute;
    console.log("handling match change");
    this.updateStateMatching(newRoute, newState.other, newWhere, imageData.pictureID);
  },
  updateStateMatching: function(current, other, where, matchID) {
    var newPics = (filterPics, matches) => {
      var matchingPics = filterPics.filter((x) => {
        matches.matches.indexOf(x.pictureID) > -1
      });
      this.setState({ current: current,
                      other: other, where: where,
                      pictureIDs: matchingPics,
                      topData: this.state.topData,
                      bottomData: this.state.bottomData,
                      matching: {pictureID: matchID, matches: matches.matches}
                    });
    };
    var noPics = () => {
      this.setState({current: current, other: other, where: where,
                      pictureIDs:[], topData: this.state.topData,
                      bottomData: this.state.bottomData,
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
    var blank = {
      name: '',
      pictureID: '',
      type: Items.ANY
    };
    if (newData.type === Items.TOPS) {
      currentState.topData = newData
      if (this.state.matching.pictureID === '') {
        currentState.bottomData = blank;
      }
    } else {
      currentState.bottomData = newData;
      if (this.state.matching.pictureID === '') {
        currentState.topData = blank;
      }
    }
    this.setState(currentState);
  },
  handleMatchPress: function(matchID, targetID, isAdd, rowData) {
    this.handleListPress(rowData);
  },
  updateState: function(current, other, where) {
    var newPics = (filterPics) => {
      this.setState({ current: current,
                      other: other, where: where,
                      pictureIDs: filterPics,
                      topData: this.state.topData,
                      bottomData: this.state.bottomData,
                      matching: {pictureID: '', matches: []}
                    });
    };
    var noPics = () => {
      this.setState({current: current, other: other, where: where,
                      pictureIDs:[], topData: this.state.topData,
                      bottomData: this.state.bottomData,
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

module.exports = UserListSwitcher;
