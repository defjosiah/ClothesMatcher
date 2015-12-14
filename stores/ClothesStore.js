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
        return true;
    },
    async getItem(pictureKey, successFunc, failFunc) {
        this.executeWithAwait(() => AsyncStorage.getItem(pictureKey),
                                successFunc, failFunc);
    },
    async executeWithAwait(dbFunc, successFunc, failFunc) {
        try {
            var value = await dbFunc();
            if (value == null) {
                failFunc();
            } else {
                successFunc(JSON.parse(value));
            }
        } catch (error) {
            console.log('AsyncStorage error: ' + error);
        }
    }
    // getItems(pictureKeys) {

    // },
    // getItemsWithFilter(filter) {

    // },
};

module.exports = ClothesStore;
