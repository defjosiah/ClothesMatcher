/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  CameraRoll,
  AsyncStorage
} = React;

var items = require('../constants/ItemConstants');
var KEY_ROOT = '@ITEM_STORE';
var defaultData = JSON.stringify({name: '', type: '', matches:[]});

/**
 * Singleton handling access to the AsyncStorage api.
 */
var ClothesStore = {
    init() {
        console.log('Init ClothesStore');
        return true;
    },
    async getItem(pictureID, successFunc, failFunc) {
        return this.withAwait(() => AsyncStorage.getItem(pictureID),
                                successFunc, failFunc);
    },
    async getItemsWithFilter(filterFunc, successFunc, failFunc) {
        allItemsSuccess = (f) => {
            this.withAwait(() => AsyncStorage.multiGet(),
                                  successFunc, failFunc);
        };
        return this.withAwaitFilter(() => AsyncStorage.getItem(KEY_ROOT),
                                    filterFunc,
                                    allItemsSuccess,
                                    () => console.log("Failed filter items"));
    },
    /**
     * addItem will replace the current data with a new data function.
     */
    async addItem(pictureID, data, successFunc, failFunc) {
        updateBaseSuccess = (value) => {
            this.addToBase([pictureID]);
            successFunc(value);
        };
        return this.withAwait(() => AsyncStorage.setItem(pictureID, data),
                              updateBaseSuccess, failFunc);
    },
    /**
     * Set a range of pictureIDs with either empty data or the 
     * supplied data pair.
     */
    async addItems(pictureDataPairs, successFunc, failFunc) {
        updateBaseSuccess = () => {
            this.addToBase(pictureDataPairs.map((x) => x[0]));
            successFunc();
        };
        pairsJSON = pictureDataPairs.map((x) => {
                return ([x[0], JSON.stringify(x[1])])
            });
        return this.withAwait(() => AsyncStorage.multiSet(pictureDataPairs),
                              updateBaseSuccess, failFunc);
    },
    async withAwait(dbFunc, successFunc, failFunc) {
        var value = null;
        try {
            value = await dbFunc();
            if (value == null) {
                failFunc();
            } else {
                successFunc(JSON.parse(value));
            }
        } catch (error) {
            console.log('AsyncStorage error: ' + error);
        }
        return value;
    },
    async withAwaitFilter(dbFunc, filterFunc, successFunc, failFunc) {
        var value = null;
        try {
            value = await dbFunc();
            if (value == null) {
                failFunc();
            } else {
                value.filter(filterFunc);
                successFunc(JSON.parse(value));
            }
        } catch (error) {
            console.log('AsyncStorage error: ' + error);
        }
        return value;
    },
    async withAwaitVoid(dbFunc, successFunc, failFunc) {
        try {
           await dbFunc();
           successFunc();
        } catch (error) {
            failFunc()
        }
    },
    addToBase(pictureIDs) {
        var base = this.getItem(KEY_ROOT);
        pictureIDs.forEach((k) => {
            if (base.indexOf(k) < 0) {
                base.push(k);
            }
        });
        this.withAwait(() => AsyncStorage.setItem(KEY_ROOT,
                                JSON.stringify(base)),
                        () => console.log("Successful"),
                        () => console.log("Unsuccessful"));
    }
};

module.exports = ClothesStore;
