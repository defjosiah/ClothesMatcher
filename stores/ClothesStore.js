/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  CameraRoll,
  AsyncStorage
} = React;

var items = require('../constants/ItemConstants')
var KEY_ROOT = '@ITEM_STORE'

/**
 * Singleton handling access to the AsyncStorage api.
 */
var ClothesStore = {
    init() {
        console.log('Init ClothesStore');
        console.log(items.TOPS);
        console.log(items.BOTTOMS);
        return true;
    },
    // async getItem(pictureKey) {
    //     try {
    //         var value = await JSON.parse(AsyncStorage.getItem(pictureKey));
    //     } catch (error) {
    //         console.log('AsyncStorage error: ' + error);
    //     }
    // },
    // getItems(pictureKeys) {

    // },
    // getItemsWithFilter(filter) {

    // },
};

module.exports = ClothesStore;
